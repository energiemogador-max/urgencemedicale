import { validateContent } from "../content/index";

const result = validateContent();

if (result.ok) {
  console.log("content: OK — no placeholders, all schemas valid.");
  process.exit(0);
}

console.error(`content: FAILED — ${result.errors.length} issue(s):\n`);
for (const error of result.errors) {
  console.error(`  - ${error}`);
}
console.error(
  "\nFix every item above in the corresponding content/*.ts file, then re-run `npm run validate:content`."
);
process.exit(1);
