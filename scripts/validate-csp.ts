import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Checks the Content-Security-Policy in public/_headers against what the
 * exported HTML in out/ actually contains.
 *
 * This exists because the opposite mistake shipped: `script-src 'self'` was
 * committed with a comment asserting the site needed nothing more, when
 * Next's App Router inlines the RSC flight payload as <script> tags on every
 * page. The result was a live site where React never hydrated — and nothing
 * in the build caught it, because a CSP violation is a *browser* runtime
 * error. `next build` is perfectly happy to emit HTML its own headers block.
 *
 * So this runs as `postbuild`, against the real output, and asks one
 * question per feature: the page uses X, does the policy still permit X?
 */

const HEADERS_FILE = "public/_headers";
const OUT_DIR = "out";

function walk(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) found.push(...walk(path));
    else if (path.endsWith(".html")) found.push(path);
  }
  return found;
}

/** The CSP applying to `/*`, parsed into directive -> source list. */
function parsePolicy(): Map<string, string[]> {
  const text = readFileSync(HEADERS_FILE, "utf8");
  const line = text
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.startsWith("Content-Security-Policy:"));

  if (!line) {
    console.error(`csp: FAILED — no Content-Security-Policy found in ${HEADERS_FILE}.`);
    process.exit(1);
  }

  const directives = new Map<string, string[]>();
  for (const part of line.slice("Content-Security-Policy:".length).split(";")) {
    const [name, ...sources] = part.trim().split(/\s+/);
    if (name) directives.set(name, sources);
  }
  return directives;
}

/**
 * Resolves a directive the way a browser does — falling back to default-src
 * when it isn't set. Without this the check would pass a policy that only
 * looks permissive because the specific directive is absent.
 */
function effective(policy: Map<string, string[]>, directive: string, fallback = "default-src"): string[] {
  return policy.get(directive) ?? policy.get(fallback) ?? [];
}

const policy = parsePolicy();
const files = walk(OUT_DIR);
const errors: string[] = [];

// Inline <script> blocks that the browser will execute. `src=` scripts are
// covered by 'self'; JSON-LD is data, never executed, so neither counts.
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g;
const EVENT_HANDLER = /\son(?:click|load|error|submit|focus|blur|change|input|mouseover)\s*=\s*"/;
/**
 * Only subresources the browser FETCHES are governed by CSP. Navigation
 * targets are not: `<a href="https://wa.me/...">` (the WhatsApp button) and
 * `<link rel="canonical">` are both cross-origin URLs that no directive
 * applies to, and flagging them would block the build over nothing.
 */
const EXTERNAL_SUBRESOURCE =
  /<(?:script|img|iframe|video|audio|source|track|embed|object)\b[^>]*\b(?:src|data)="(https?:\/\/[^"]+)"/g;
const EXTERNAL_LINK_FETCH =
  /<link\b[^>]*\brel="(?:stylesheet|preload|modulepreload|prefetch)"[^>]*\bhref="(https?:\/\/[^"]+)"/g;

let inlineScripts = 0;
const handlerFiles: string[] = [];
const iframeFiles: string[] = [];
const externalOrigins = new Set<string>();

for (const file of files) {
  const html = readFileSync(file, "utf8");
  inlineScripts += [...html.matchAll(INLINE_SCRIPT)].length;
  if (EVENT_HANDLER.test(html)) handlerFiles.push(file);
  if (/<iframe/.test(html)) iframeFiles.push(file);
  for (const pattern of [EXTERNAL_SUBRESOURCE, EXTERNAL_LINK_FETCH]) {
    for (const match of html.matchAll(pattern)) {
      const url = match[1];
      if (url) externalOrigins.add(new URL(url).origin);
    }
  }
}

const scriptSrc = effective(policy, "script-src");
const allowsInlineScript =
  scriptSrc.includes("'unsafe-inline'") || scriptSrc.some((s) => s.startsWith("'sha") || s.startsWith("'nonce-"));

if (inlineScripts > 0 && !allowsInlineScript) {
  errors.push(
    `script-src blocks inline scripts, but the export contains ${inlineScripts} of them ` +
      `(Next inlines the RSC flight payload). The site will load but never hydrate. ` +
      `Add 'unsafe-inline' to script-src in ${HEADERS_FILE}.`
  );
}

// script-src-attr 'none' is what buys back most of the protection lost to
// 'unsafe-inline' — but only while no page actually relies on a handler
// attribute. If one appears, the policy and the markup have to be reconciled.
const scriptSrcAttr = effective(policy, "script-src-attr", "script-src");
if (handlerFiles.length > 0 && scriptSrcAttr.includes("'none'")) {
  errors.push(
    `script-src-attr is 'none', but ${handlerFiles.length} page(s) use inline event handler attributes ` +
      `(e.g. ${handlerFiles[0]}). Those handlers will not fire.`
  );
}

if (iframeFiles.length > 0) {
  const frameSrc = effective(policy, "frame-src");
  if (frameSrc.includes("'none'") || frameSrc.length === 0) {
    errors.push(`frame-src blocks framing, but ${iframeFiles.length} page(s) embed an <iframe> (e.g. ${iframeFiles[0]}).`);
  }
}

// Any external origin in the markup has to be allow-listed somewhere, or the
// resource silently fails to load. This is the check that will fire the day
// an analytics tag or a Google Maps embed is pasted in.
for (const origin of externalOrigins) {
  const allowed = [...policy.values()].some((sources) => sources.some((s) => s.includes(new URL(origin).hostname)));
  if (!allowed) {
    errors.push(`${origin} is referenced in the exported HTML but is not allow-listed in any CSP directive.`);
  }
}

if (errors.length === 0) {
  console.log(
    `csp: OK — policy checked against ${files.length} exported page(s): ` +
      `${inlineScripts} inline script(s) permitted, ${handlerFiles.length} inline handler(s), ` +
      `${iframeFiles.length} iframe(s), ${externalOrigins.size} external origin(s).`
  );
  process.exit(0);
}

console.error(`csp: FAILED — ${errors.length} issue(s):\n`);
for (const error of errors) console.error(`  - ${error}`);
console.error(`\nThe CSP lives in ${HEADERS_FILE}. A violation here is invisible to \`next build\` — it only appears in the browser console on the deployed site.`);
process.exit(1);
