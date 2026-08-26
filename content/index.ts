import { ContentSchema, isPlaceholder } from "./schema";
import type { Content } from "./schema";
import { business } from "./business";
import { doctors } from "./doctors";
import { pricing } from "./pricing";
import { cities, quartiers } from "./geo";
import { specialties } from "./specialties";
import { situations } from "./situations";

const raw: Content = { business, doctors, pricing, cities, quartiers, specialties, situations };

/** Recursively collects every unfilled TODO placeholder, with a JSON-path-like location. */
function collectPlaceholders(value: unknown, path: string, out: string[]): void {
  if (typeof value === "string") {
    if (isPlaceholder(value)) out.push(`${path}: ${value}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectPlaceholders(item, `${path}[${i}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, val] of Object.entries(value)) {
      collectPlaceholders(val, path ? `${path}.${key}` : key, out);
    }
  }
}

export interface ContentValidationResult {
  ok: boolean;
  errors: string[];
}

export function validateContent(): ContentValidationResult {
  const errors: string[] = [];

  const parsed = ContentSchema.safeParse(raw);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      errors.push(`${issue.path.join(".")}: ${issue.message}`);
    }
  }

  const placeholders: string[] = [];
  collectPlaceholders(raw, "", placeholders);
  errors.push(...placeholders.map((p) => `unfilled placeholder at ${p}`));

  return { ok: errors.length === 0, errors };
}

/**
 * Throws a single aggregated error listing every problem if content is
 * invalid or still has placeholders. Not called eagerly here — this module
 * stays side-effect-free so `scripts/validate-content.ts` can report cleanly.
 * `src/lib/content.ts` (the app-facing loader every page imports from) calls
 * this at module scope instead, so it fails loudly in both `next dev` and
 * `next build`.
 */
export function assertContentValid(): Content {
  const result = validateContent();
  if (!result.ok) {
    throw new Error(
      `Content validation failed (${result.errors.length} issue(s)):\n` +
        result.errors.map((e) => `  - ${e}`).join("\n")
    );
  }
  return raw;
}

export { business, doctors, pricing, cities, quartiers, specialties, situations };
