/**
 * Turns `content.business.whatsappNumber` (e.g. "+212600000000") into a
 * wa.me click-to-chat link. WhatsApp is its own field in content/business.ts,
 * separate from phoneHref — the operator may route it to a different line
 * than the call number.
 */
export function toWhatsAppHref(whatsappNumber: string): string {
  return `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;
}
