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
 *  1. Copy the <link rel="stylesheet"> tags from a normal page. Their hashed
 *     filenames change every build, which is precisely why this reads them
 *     instead of naming them.
 *  2. Rewrite the localhost metadataBase fallback to the real origin.
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
if (sheets.length === 0) fail(`no <link rel="stylesheet"> found in ${REFERENCE}`);

const missing = sheets.filter((tag) => {
  const href = /href="([^"]+)"/.exec(tag)?.[1];
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
if (!/<link[^>]+rel="stylesheet"/.test(done)) fail("stylesheet still absent after injection");
if (done.includes("localhost:3000")) fail("localhost URLs still present after rewrite");
if (!done.includes("tel:")) fail("the 404 has no phone number on it");

console.log(
  `404: OK — ${missing.length} stylesheet(s) injected, ${localhostRefs} localhost URL(s) rewritten, phone number present.`
);
