import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Makes every exported page preload exactly the fonts it uses.
 *
 * WHY
 *
 * The fonts are `font-display: optional` (src/app/fonts.ts): the browser
 * waits up to ~100 ms for a preloaded optional font, then keeps whichever face
 * it has for the page, so nothing moves when the font arrives. That makes the
 * preload the thing that decides whether a first visit sees Archivo at all,
 * and two things were wrong with it (2026-09-30):
 *
 *  - The deployed site (built on Cloudflare, Linux) preloaded BOTH Archivo
 *    and Cairo on every page: next/font preloads every font declared in a
 *    module a layout imports, and both lived in fonts.ts. French and English
 *    pages spent 31 KB of high-priority bandwidth, next to the LCP image, on
 *    an Arabic font they never draw. Cairo now has its own module, and this
 *    step removes any preload for a family the page does not use, whatever
 *    Next emits.
 *  - A local Windows build preloads nothing: its next-font-manifest has no
 *    app entries. This step adds the missing preloads, so what is tested
 *    locally is what ships.
 *
 * HOW
 *
 * Nothing is hard-coded. The <html> element carries the next/font variable
 * classes the page uses (`.__variable_x{--font-sans:"Archivo",…}`), and the
 * inlined @font-face rules name each family's files; next/font marks the ones
 * worth preloading ".p." (Archivo's latin subset, Cairo's arabic one).
 */

const OUT_DIR = "out";
const SKIP_DIRS = new Set([join(OUT_DIR, "admin"), join(OUT_DIR, "_next")]);
const HEAD_ANCHOR = '<meta charSet="utf-8"/>';
const FONT_PRELOAD = /<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="font")[^>]*\bhref="([^"]+)"[^>]*\/?>/g;

function fail(message: string): never {
  console.error(`fonts: FAILED — ${message}`);
  process.exit(1);
}

function walk(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (SKIP_DIRS.has(path)) continue;
    if (statSync(path).isDirectory()) found.push(...walk(path));
    else if (path.endsWith(".html")) found.push(path);
  }
  return found;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Families switched on by the next/font variable classes on <html>. */
function pageFamilies(html: string): string[] {
  const classes = /<html\b[^>]*\bclass="([^"]*)"/.exec(html)?.[1]?.split(/\s+/) ?? [];
  const families: string[] = [];
  for (const cls of classes) {
    const family = new RegExp(`\\.${escape(cls)}\\{--font-[\\w-]+:\\s*["']?([^"',;}]+)`).exec(html)?.[1];
    if (family) families.push(family.trim());
  }
  return families;
}

/** The ".p." (preloadable) files of the given families, from the inlined @font-face rules. */
function preloadFiles(html: string, families: string[]): Set<string> {
  const files = new Set<string>();
  for (const match of html.matchAll(/@font-face\{([^}]*)\}/g)) {
    const body = match[1] ?? "";
    const family = /font-family:\s*["']?([^;"']+)/.exec(body)?.[1]?.trim();
    const url = /url\((\/_next\/static\/media\/[^)]+\.p\.woff2)\)/.exec(body)?.[1];
    if (family && url && families.includes(family)) files.add(url);
  }
  return files;
}

let pages = 0;
let added = 0;
let removed = 0;
for (const file of walk(OUT_DIR)) {
  const html = readFileSync(file, "utf8");
  if (!html.includes("@font-face")) continue; // e.g. a page whose CSS is linked, not inlined
  const families = pageFamilies(html);
  if (families.length === 0) continue;
  const wanted = preloadFiles(html, families);
  if (wanted.size === 0) fail(`${file}: no preloadable font file for ${families.join(", ")}`);
  if (!html.includes(HEAD_ANCHOR)) fail(`${file}: no ${HEAD_ANCHOR} to anchor the preloads after`);

  const present = new Set<string>();
  let out = html.replace(FONT_PRELOAD, (tag, href: string) => {
    if (wanted.has(href) && !present.has(href)) {
      present.add(href);
      return tag;
    }
    removed++;
    return "";
  });
  const tags = [...wanted]
    .filter((href) => !present.has(href))
    .map((href) => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin=""/>`);
  added += tags.length;
  out = out.replace(HEAD_ANCHOR, HEAD_ANCHOR + tags.join(""));

  if (out !== html) writeFileSync(file, out);
  pages++;
}

if (pages === 0) fail(`no page with inlined fonts found in ${OUT_DIR}`);
console.log(`fonts: OK — ${pages} page(s) preload only the fonts they use (${added} added, ${removed} removed).`);
