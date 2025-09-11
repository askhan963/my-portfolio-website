// next.config.mjs
import path from "path";

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:all*(js|css|png|jpg|jpeg|gif|svg|webp|avif|ico|ttf|otf|woff|woff2|pdf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    return config;
  },
};

import withBundleAnalyzer from "@next/bundle-analyzer";
const withAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig = withAnalyzer(baseConfig);

export default nextConfig;
