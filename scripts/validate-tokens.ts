import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Design-token gate. Runs after the build, against the CSS Tailwind actually
 * emitted rather than against the source.
 *
 * WHY THIS EXISTS
 *
 * Tailwind v4 resolves utilities from `@theme` namespaces, and a token in the
 * wrong namespace is not an error — it is silently ignored. This site has been
 * bitten twice:
 *
 *  - A whole type scale was declared as `--font-size-*` when Tailwind v4 wants
 *    `--text-*`. Every heading rendered at the default size for weeks, and a
 *    diagnosis of "the headings are 44px" was wrong because they were 30px.
 *  - Two components used `.font-serif` while the file declared
 *    `--font-family-serif`. Tailwind never reads that name, so the utility
 *    resolved to its OWN default `--font-serif` — and those elements rendered
 *    in Georgia, on a site that deliberately ships one family.
 *
 * Note what the second one is not: it is not an element that failed to style.
 * It styled, confidently, with something nobody chose. That is why "the page
 * still looks plausible" is not evidence of correctness here, and why this
 * compares declarations against the compiled output instead of reading source.
 *
 * THREE CHECKS
 *
 *  1. NEAR-MISS NAMESPACE — a token named `--font-size-*` or `--font-family-*`,
 *     which look like Tailwind v4 namespaces but are not (it wants `--text-*`
 *     and `--font-*`). This is the trap that caught this codebase twice, and
 *     it fails the build. Tokens the stylesheet consumes by hand are named
 *     `--body-text-*` precisely so they cannot be confused for these.
 *  2. DANGLING — the compiled CSS calls `var(--x)` with no fallback and
 *     nothing defines `--x`. Fails the build.
 *  3. DEAD — `globals.css` declares a token that never reaches the compiled
 *     CSS. Reported only: an unused token is untidy, not broken, and failing
 *     on it would make adding a token before its first use impossible.
 */

const SOURCE = "src/app/globals.css";
const CSS_DIR = "out/_next/static/css";

/**
 * Custom properties that are legitimately defined outside the stylesheet, so
 * "nothing defines it" is wrong for them.
 *
 * `--font-sans` is injected by next/font as a class on <html> (see
 * app/fonts.ts). `--tw-*` are Tailwind's own internals, registered with
 * @property or set inline on elements.
 */
const DEFINED_ELSEWHERE = [/^--font-sans$/, /^--tw-/];

function fail(message: string): never {
  console.error(`tokens: FAILED — ${message}`);
  process.exit(1);
}

let css: string;
try {
  const files = readdirSync(CSS_DIR).filter((f) => f.endsWith(".css"));
  if (files.length === 0) fail(`no compiled stylesheet in ${CSS_DIR} — run the build first`);
  css = files.map((f) => readFileSync(join(CSS_DIR, f), "utf8")).join("\n");
} catch {
  fail(`cannot read ${CSS_DIR} — run the build first`);
}

const source = readFileSync(SOURCE, "utf8");

/** Every `--name:` declaration in a chunk of CSS. */
function declarationsIn(text: string): Set<string> {
  const out = new Set<string>();
  for (const m of text.matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) out.add(m[1]!);
  return out;
}

const declaredInSource = declarationsIn(source);
const definedInCss = declarationsIn(css);

// @property registrations also count as definitions.
for (const m of css.matchAll(/@property\s+(--[A-Za-z0-9_-]+)/g)) definedInCss.add(m[1]!);

const referencedInCss = new Set<string>();
for (const m of css.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) referencedInCss.add(m[1]!);

/*
 * Only a var() with NO fallback can dangle. `var(--x, normal)` is a
 * deliberate optional hook — Tailwind's own preflight uses several
 * (--default-font-feature-settings and friends) and they are undefined by
 * design. Flagging those would train everyone to ignore this gate.
 */
const referencedWithoutFallback = new Set<string>();
for (const m of css.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)\s*\)/g)) referencedWithoutFallback.add(m[1]!);

const excused = (name: string) => DEFINED_ELSEWHERE.some((re) => re.test(name));

/*
 * Names that read as Tailwind v4 theme namespaces but are not. Tailwind
 * ignores them silently — no error, no warning — so they are declared, never
 * generate a utility, and the utility someone writes anyway falls through to
 * Tailwind's own default value.
 */
const NEAR_MISS: { wrong: RegExp; right: string }[] = [
  { wrong: /^--font-size-/, right: "--text-*" },
  { wrong: /^--font-family-/, right: "--font-*" },
  { wrong: /^--colour-/, right: "--color-*" },
  { wrong: /^--border-radius-/, right: "--radius-*" },
  { wrong: /^--line-height-/, right: "--text-*--line-height" },
];

const nearMisses = [...declaredInSource].flatMap((name) => {
  const hit = NEAR_MISS.find((n) => n.wrong.test(name));
  return hit ? [`  - ${name}  ->  should be ${hit.right}`] : [];
});

if (nearMisses.length > 0) {
  fail(
    `${nearMisses.length} token(s) use a name Tailwind v4 does not read:\n` +
      nearMisses.join("\n") +
      `\n\nTailwind ignores these silently, so the matching utility falls back to ` +
      `Tailwind's own default and the element styles itself with a value nobody chose.`
  );
}

const dangling = [...referencedWithoutFallback].filter((n) => !definedInCss.has(n) && !excused(n)).sort();
const dead = [...declaredInSource].filter((n) => !referencedInCss.has(n) && !definedInCss.has(n)).sort();

if (dead.length > 0) {
  console.log(
    `tokens: ${dead.length} declared token(s) never reach the compiled CSS ` +
      `(unused, or in a namespace Tailwind does not read): ${dead.join(", ")}`
  );
}

if (dangling.length > 0) {
  fail(
    `${dangling.length} custom propert(y/ies) are used by the compiled CSS but defined nowhere:\n` +
      dangling.map((n) => `  - var(${n})`).join("\n") +
      `\n\nA utility resolving to an undefined property silently does nothing. Either define it in ` +
      `@theme using Tailwind v4's namespace (--color-*, --text-*, --font-*, --radius-*), or stop using ` +
      `the utility that references it.`
  );
}

console.log(
  `tokens: OK — ${declaredInSource.size} declared, ${referencedInCss.size} referenced, 0 dangling.`
);
