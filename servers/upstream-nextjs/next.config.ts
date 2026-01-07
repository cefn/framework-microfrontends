import type { NextConfig } from "next";

// import { upstream } from "./src/upstreamDef";

const nextConfig: NextConfig = {
  assetPrefix: "http://localhost:3002",
  // assetPrefix: upstream.origin,
};

export default nextConfig;
