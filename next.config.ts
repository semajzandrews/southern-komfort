import type { NextConfig } from "next";

// Static export. REVIEW_PREFIX sets assetPrefix only for local subpath review
// builds; Vercel builds with it unset -> correct root-absolute paths in prod.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(process.env.REVIEW_PREFIX ? { assetPrefix: process.env.REVIEW_PREFIX } : {}),
};

export default nextConfig;
