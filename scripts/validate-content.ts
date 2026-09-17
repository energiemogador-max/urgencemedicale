import { assertContentValid, validateContent } from "../content/index";
import { missingTranslations } from "../content/i18n";

/**
 * Content gate: schemas, no unfilled placeholders, word thresholds — and, for
 * English and Arabic, that every page the French site has exists in that
 * language too and is not thinner than its threshold.
 *
 * I18N_PARTIAL=1 downgrades the translation half to a warning. That is for a
 * local build while translations are being written; it must never be set in
 * the deploy, which is why it defaults to strict.
 */
const result = validateContent();
const errors = [...result.errors];
const partial = process.env.I18N_PARTIAL === "1";
let missing: string[] = [];

if (result.ok) {
  const content = assertContentValid();
  missing = [...missingTranslations(content, "en"), ...missingTranslations(content, "ar")];
  if (!partial) errors.push(...missing);
}

if (errors.length === 0) {
  const note = partial && missing.length > 0 ? ` (${missing.length} translation gap(s) ignored: I18N_PARTIAL=1)` : "";
  console.log(`content: OK — no placeholders, all schemas valid${note}.`);
  process.exit(0);
}

console.error(`content: FAILED — ${errors.length} issue(s):\n`);
for (const error of errors.slice(0, 40)) {
  console.error(`  - ${error}`);
}
if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`);
console.error(
  "\nFix every item above in the corresponding content/*.ts file (or content/i18n/{en,ar}/), then re-run `npm run validate:content`."
);
process.exit(1);
