import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Puts the font preload back into every exported page.
 *
 * WHY
 *
 * next/font preloads the files it marks ".p." (Archivo's latin subset,
 * Cairo's arabic one) with a <link rel="preload" as="font"> in <head>. The
 * 2026-08-27 audit found them there, ahead of the stylesheet. They vanished
 * on 2026-09-16, when `experimental.inlineCss` went on to stop the stylesheet
 * blocking render: with the CSS inlined, Next no longer emits them, and nobody
 * noticed. The font was then requested only once layout needed it, after the
 * first paint.
 *
 * The fonts are `font-display: optional` (src/app/fonts.ts): the browser
 * waits up to ~100 ms for a preloaded optional font, then keeps whichever face
 * it has, so nothing moves. Requested from the top of <head>, the 35 KB
 * Archivo file usually lands inside that window on an ordinary 4G
 * connection, and the page paints in the brand font from the first frame.
 *
 * HOW
 *
 * Nothing is hard-coded: the <html> element carries the next/font variable
 * classes the page uses (`.__variable_x{--font-sans:"Archivo",…}`), and the
 * inlined @font-face rules name each family's ".p." file. So a French page
 * preloads Archivo only, and an Arabic page Archivo and Cairo, exactly as
 * next/font itself would.
 */

const OUT_DIR = "out";
const SKIP_DIRS = new Set([join(OUT_DIR, "admin"), join(OUT_DIR, "_next")]);
const HEAD_ANCHOR = '<meta charSet="utf-8"/>';

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

/** The ".p." (preloadable) file of each family, from the inlined @font-face rules. */
function preloadFiles(html: string, families: string[]): string[] {
  const files = new Set<string>();
  for (const match of html.matchAll(/@font-face\{([^}]*)\}/g)) {
    const body = match[1] ?? "";
    const family = /font-family:\s*["']?([^;"']+)/.exec(body)?.[1]?.trim();
    const url = /url\((\/_next\/static\/media\/[^)]+\.p\.woff2)\)/.exec(body)?.[1];
    if (family && url && families.includes(family)) files.add(url);
  }
  return [...files];
}

let pages = 0;
let links = 0;
for (const file of walk(OUT_DIR)) {
  const html = readFileSync(file, "utf8");
  if (!html.includes("@font-face")) continue; // e.g. a page whose CSS is linked, not inlined
  const families = pageFamilies(html);
  if (families.length === 0) continue;
  const files = preloadFiles(html, families);
  if (files.length === 0) fail(`${file}: no preloadable font file for ${families.join(", ")}`);
  if (!html.includes(HEAD_ANCHOR)) fail(`${file}: no ${HEAD_ANCHOR} to anchor the preload after`);

  const tags = files
    .filter((f) => !html.includes(`href="${f}"`))
    .map((f) => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin=""/>`)
    .join("");
  if (tags) {
    writeFileSync(file, html.replace(HEAD_ANCHOR, HEAD_ANCHOR + tags));
    links += files.length;
  }
  pages++;
}

if (pages === 0) fail(`no page with inlined fonts found in ${OUT_DIR}`);
console.log(`fonts: OK — ${links} font preload(s) restored across ${pages} page(s).`);
