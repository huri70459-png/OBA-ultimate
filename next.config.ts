import type { NextConfig } from "next";

// Enterprise-grade defaults (Tier-1 redesign):
// - reactStrictMode ON surfaces side-effect and lifecycle bugs in development.
// - TypeScript/ESLint errors are NEVER ignored: type and lint failures must
//   break the build so regressions cannot slip into production.
const nextConfig: NextConfig = {
  output: "standalone",
  // The Docker development wrapper is accessed from the Windows host at
  // 127.0.0.1:3003. Allow that origin so Next's client bundle and hydration
  // are not blocked by the container's internal localhost:3000 origin.
  allowedDevOrigins: ["127.0.0.1:3000", "localhost:3000", "127.0.0.1:3003", "localhost:3003"],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
