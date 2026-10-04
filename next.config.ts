import type { NextConfig } from "next";

// On GitHub Pages without a custom domain the site lives under /<repo>/.
// The deploy workflow passes that prefix in NEXT_PUBLIC_BASE_PATH; with a custom domain it is empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  poweredByHeader: false,
  trailingSlash: true,
  experimental: { optimizePackageImports: ["lucide-react"] },
  images: { unoptimized: true },
};

export default nextConfig;
