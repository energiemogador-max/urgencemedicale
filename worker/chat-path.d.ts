/**
 * Type declaration for the sibling chat-path.js, so src/lib/chat-widget.ts
 * can import the single shared constant with `allowJs` left off (it stays
 * off deliberately: turning it on would pull every .js file in the repo
 * into the strict TypeScript compile graph, not just this one).
 */
export const CHAT_PATH: string;
