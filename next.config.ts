import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    // Static export has no server to run Next's Image Optimization API —
    // Cloudflare Pages serves the AVIF/WebP files next/image already emits.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
