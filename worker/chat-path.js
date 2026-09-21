/**
 * The one thing the Worker and the Next.js build both need to agree on:
 * the endpoint the browser calls and the one the Worker serves under.
 *
 * Split out of chat.js on purpose. src/lib/chat-widget.ts (compiled by
 * Next.js at build time, to generate the inline script text) only needs
 * this string — importing chat.js itself would pull its OpenRouter call,
 * the red-flag list and the system prompt into the site's build graph for
 * no reason, and risk a typecheck mismatch between two different toolchains
 * compiling the same file for two different runtimes.
 */
export const CHAT_PATH = "/api/chat";
