// next.config.mjs
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
    return config;
  },
  experimental: {
    optimizeFonts: true,
  },
};

export default nextConfig;
