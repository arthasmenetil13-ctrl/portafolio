import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile higher up on this machine makes Next guess the wrong workspace root.
  turbopack: { root: __dirname },
};

export default nextConfig;
