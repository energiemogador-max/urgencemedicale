import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Removes the React/Next client runtime from the exported HTML.
 *
 * WHY
 *
 * Every page on this site is static content. Menus and FAQs are native
 * <details>, links are plain anchors, the tap tracker is an inline script that
 * never touches React, and the one live element (the homepage clock) is a few
 * lines of plain JavaScript. Yet App Router ships every page with the React
 * runtime and the full RSC "flight" payload inlined as <script> tags, so the
 * browser can hydrate a tree that has nothing to hydrate.
 *
 * Measured on the live site (Lighthouse 13.4.1, mobile, 2026-09-17), the
 * Belvédère page spent 3.7s of main-thread time just PARSING that payload,
 * with 3.35s of total blocking time, and its LCP paragraph waited ~1s behind
 * it. The budget is an LCP under 1.8s on 4G.
 *
 * WHAT IS REMOVED
 *
 *  - <script src="/_next/static/chunks/…"> (runtime, router, page chunks)
 *  - <link rel="preload" as="script" href="/_next/static/chunks/…">
 *  - the inline flight payload: <script>self.__next_f…</script>
 *
 * Everything else stays: JSON-LD, the tracker, the clock, the analytics
 * beacon, fonts and the inlined CSS.
 *
 * WHAT THIS MEANS FOR FUTURE CODE
 *
 * Nothing on this site may rely on React running in the browser: no
 * "use client" components, no onClick, no client-side state. The build
 * enforces it: a source file declaring "use client" fails here, because its
 * code would be stripped along with the runtime and silently do nothing.
 *
 * The admin dashboard (out/admin) is a hand-written page, not Next output,
 * and is left alone.
 */

const OUT_DIR = "out";
const SKIP_DIRS = new Set([join(OUT_DIR, "admin"), join(OUT_DIR, "_next")]);

function fail(message: string): never {
  console.error(`runtime: FAILED — ${message}`);
  process.exit(1);
}

function walk(dir: string, ext: string, skip = SKIP_DIRS): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (skip.has(path)) continue;
    if (statSync(path).isDirectory()) found.push(...walk(path, ext, skip));
    else if (path.endsWith(ext)) found.push(path);
  }
  return found;
}

// 1. No client components may exist: their code would be removed below.
for (const file of [...walk("src", ".tsx", new Set()), ...walk("src", ".ts", new Set())]) {
  const head = readFileSync(file, "utf8").slice(0, 200);
  if (/^\s*["']use client["']/m.test(head)) {
    fail(`${file} is a client component, but the exported pages ship without React (see this script's header)`);
  }
}

// 2. Strip.
const PATTERNS: RegExp[] = [
  /<script\b[^>]*\bsrc="\/_next\/static\/chunks\/[^"]*"[^>]*><\/script>/g,
  /<link\b[^>]*\bas="script"[^>]*\bhref="\/_next\/static\/chunks\/[^"]*"[^>]*\/?>/g,
  /<script>\(?self\.__next_f[\s\S]*?<\/script>/g,
];

let pages = 0;
let before = 0;
let after = 0;

for (const file of walk(OUT_DIR, ".html")) {
  const html = readFileSync(file, "utf8");
  let out = html;
  for (const p of PATTERNS) out = out.replace(p, "");

  if (out.includes("__next_f") || out.includes("/_next/static/chunks/")) {
    fail(`${file} still references the client runtime after stripping`);
  }
  if (!out.includes("tel:")) fail(`${file} lost its phone link`);

  writeFileSync(file, out);
  pages++;
  before += Buffer.byteLength(html);
  after += Buffer.byteLength(out);
}

if (pages === 0) fail(`no HTML found in ${OUT_DIR}`);

console.log(
  `runtime: OK — client runtime removed from ${pages} page(s), ${Math.round((before - after) / 1024)} KB of HTML dropped (${Math.round((1 - after / before) * 100)}%).`
);
