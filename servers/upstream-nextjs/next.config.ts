import { NEXT_ORIGIN } from "@/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: NEXT_ORIGIN,
};

export default nextConfig;
