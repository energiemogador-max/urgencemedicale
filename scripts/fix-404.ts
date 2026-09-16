import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { SITE_URL } from "../src/lib/site";

/**
 * Repairs out/404.html after the export.
 *
 * WHY THIS IS NEEDED
 *
 * The site has three root layouts — (fr), (ar), (en) — which is the only way
 * App Router allows a per-locale <html lang>/<dir>. The consequence is that
 * `app/not-found.tsx` has no layout above it, so the build never attaches the
 * stylesheet chunk to it, and never applies a metadataBase. The page ships
 * with correct markup, no CSS, and og: URLs pointing at localhost:3000.
 *
 * Cloudflare serves this exact file for every unmatched URL
 * (`not_found_handling: "404-page"`), so it is a real page real people reach.
 * Two fixes, both derived from the build's own output rather than hardcoded:
 *
 *  1. Copy the page's CSS from a normal page. Its hashed filename changes every
 *     build, which is precisely why this reads it instead of naming it.
 *  2. Rewrite the localhost metadataBase fallback to the real origin.
 *
 * The CSS arrives in one of two shapes, and both are handled:
 *
 *  - <link rel="stylesheet" href="/_next/static/css/…">, the default.
 *  - <style data-precedence="next" data-href="/_next/static/css/…">…</style>,
 *    when next.config sets experimental.inlineCss — which it does since
 *    2026-09-16, because the linked file was blocking render for ~2.1 s.
 *
 * Adding inlineCss is what broke the first version of this script: it only
 * looked for <link>, found none, and failed the build. That failure was the
 * right outcome — the alternative was a 404 page with no CSS at all.
 *
 * Fails the build loudly rather than shipping an unstyled dead end.
 */

const NOT_FOUND = "out/404.html";
const REFERENCE = "out/index.html";

function fail(message: string): never {
  console.error(`404: FAILED — ${message}`);
  process.exit(1);
}

if (!existsSync(NOT_FOUND)) fail(`${NOT_FOUND} was not generated`);
if (!existsSync(REFERENCE)) fail(`${REFERENCE} is missing, cannot read the stylesheet names`);

let html = readFileSync(NOT_FOUND, "utf8");
const reference = readFileSync(REFERENCE, "utf8");

const sheets = reference.match(/<link[^>]+rel="stylesheet"[^>]*>/g) ?? [];
const inlineStyles = reference.match(/<style[^>]*data-href="[^"]+"[^>]*>[\s\S]*?<\/style>/g) ?? [];
if (sheets.length === 0 && inlineStyles.length === 0) {
  fail(`no stylesheet found in ${REFERENCE} — neither <link rel="stylesheet"> nor an inlined <style data-href>`);
}

const cssRef = (tag: string) => /(?:data-)?href="([^"]+)"/.exec(tag)?.[1];
const missing = [...sheets, ...inlineStyles].filter((tag) => {
  const href = cssRef(tag);
  return href ? !html.includes(href) : false;
});

if (missing.length > 0) {
  if (!html.includes("</head>")) fail("no </head> to inject the stylesheet into");
  html = html.replace("</head>", `${missing.join("")}</head>`);
}

// metadataBase never resolves without a layout; Next falls back to localhost.
const localhostRefs = (html.match(/http:\/\/localhost:3000/g) ?? []).length;
if (localhostRefs > 0) html = html.split("http://localhost:3000").join(SITE_URL);

writeFileSync(NOT_FOUND, html);

// Assert the result rather than trusting the edits above.
const done = readFileSync(NOT_FOUND, "utf8");
if (!/<link[^>]+rel="stylesheet"|<style[^>]*data-href=/.test(done)) fail("stylesheet still absent after injection");
if (done.includes("localhost:3000")) fail("localhost URLs still present after rewrite");
if (!done.includes("tel:")) fail("the 404 has no phone number on it");

console.log(
  `404: OK — ${missing.length} stylesheet(s) injected, ${localhostRefs} localhost URL(s) rewritten, phone number present.`
);
