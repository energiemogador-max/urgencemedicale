import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  experimental: {
    /*
     * Put the stylesheet inside each page instead of linking it.
     *
     * Lighthouse (2026-09-16) measured the single linked CSS file blocking
     * render for about 2.1 s on simulated 4G, the largest single cost in the
     * homepage LCP (5.9 s against a 1.8 s budget). Inlining removes that
     * round-trip: the first HTML response can paint on its own. The cost is
     * HTML size, which compresses well, and it is measured in the build notes.
     */
    inlineCss: true,
  },
  images: {
    // Static export has no server to run Next's Image Optimization API —
    // Cloudflare Pages serves the AVIF/WebP files next/image already emits.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
