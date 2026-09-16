import { readFileSync } from "node:fs";

/**
 * Submit every sitemap URL to IndexNow (Bing, Yandex, Naver, Seznam, Yep).
 *
 * Run AFTER a deploy, never in the build: IndexNow fetches the key file from
 * the live site to prove ownership, and a local build must not ping search
 * engines about pages that are not online yet.
 *
 *   npm run indexnow
 *
 * Google does not take part in IndexNow (verified 2026-09-16), so this does
 * nothing for Google: request indexing in Search Console for that. Google's
 * Indexing API is not an alternative either — it is officially limited to
 * JobPosting and BroadcastEvent pages, and using it for anything else breaks
 * its terms.
 *
 * The key is public by design: it is served at /KEY.txt and only proves that
 * whoever submits controls the site.
 */
const KEY = "dd3b8933a167006e75ed4d8e84fd8c3b";
const HOST = "urgencemedicale.ma";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  const keyFile = await fetch(KEY_LOCATION);
  const served = (await keyFile.text()).trim();
  if (!keyFile.ok || served !== KEY) {
    console.error(`indexnow: key file not live at ${KEY_LOCATION} (HTTP ${keyFile.status}). Deploy first.`);
    process.exit(1);
  }
  const sitemap = readFileSync("out/sitemap.xml", "utf8");
  const urlList = [...sitemap.matchAll(new RegExp("<loc>([^<]+)</loc>", "g"))].map((m) => m[1]!.trim());
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  // 200 = accepted, 202 = accepted pending key verification.
  console.log(`indexnow: submitted ${urlList.length} URL(s) -> HTTP ${res.status} ${res.statusText}`);
  if (res.status >= 400) process.exit(1);
}

main().catch((error) => {
  console.error("indexnow: failed", error);
  process.exit(1);
});
