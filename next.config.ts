import type { NextConfig } from "next";

// Enterprise-grade defaults (Tier-1 redesign):
// - reactStrictMode ON surfaces side-effect and lifecycle bugs in development.
// - TypeScript/ESLint errors are NEVER ignored: type and lint failures must
//   break the build so regressions cannot slip into production.
const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
