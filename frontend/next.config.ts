import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Removed rewrites - using Next.js API routes instead
  serverExternalPackages: ['bcryptjs']
};

export default nextConfig;
