/**
 * Plain `<a>` to a wa.me link — no JS required to work, same as CallButton.
 * Pure presentational (a URL prop, not a content/ import) for the same
 * preview-harness reason as CallButton.
 *
 * The label is dark ink, not white. WhatsApp's brand green (#25d366) is a
 * light colour: white on it measures 1.98:1, which fails not just the 4.5:1
 * for text but the 3:1 floor for graphics — it reads as if the text and the
 * button are the same colour. Dark ink on the same green is 8.62:1, and on
 * the darker hover green 5.51:1. The green itself is unchanged, so the button
 * still reads as the WhatsApp button; only the ink flipped.
 */
export function WhatsAppButton({
  href,
  showLabel = true,
  className = "",
  tap,
}: {
  href: string;
  showLabel?: boolean;
  className?: string;
  /** Names this surface for the beacon — see lib/analytics.ts. */
  tap?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-tap={tap}
      aria-label="Contacter sur WhatsApp"
      className={`flex items-center justify-center gap-2 rounded-md bg-whatsapp px-3.5 py-3 font-bold text-ink hover:bg-whatsapp-dark sm:px-4 ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 sm:h-6 sm:w-6">
        <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10.1 9 9.6 7.8 9.4 7.3c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.2L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4 14.9 3.5 13.5 3.5 12 3.5 7.3 7.3 3.5 12 3.5S20.5 7.3 20.5 12 16.7 20.2 12 20.2z" />
      </svg>
      {showLabel && "WhatsApp"}
    </a>
  );
}
