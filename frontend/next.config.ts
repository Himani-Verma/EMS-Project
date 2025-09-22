import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure for Netlify deployment
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  serverExternalPackages: ['bcryptjs']
};

export default nextConfig;
