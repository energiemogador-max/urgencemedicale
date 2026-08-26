/**
 * Server-rendered JSON-LD emitter — a plain `<script>` tag, present in the
 * static HTML with no JS required to run (Phase 4 hard rule: server-rendered).
 * `<` is escaped so a value can never prematurely close the script tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
