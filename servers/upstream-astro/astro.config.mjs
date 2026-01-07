// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import node from "@astrojs/node";

import { upstream } from "./src/upstreamDef";

// https://astro.build/config
export default defineConfig({
  server: {
    port: upstream.port,
    headers: {
      "Access-Control-Allow-Origin": upstream.cors,
    },
  },
  site: upstream.origin,
  build: {
    assetsPrefix: upstream.origin,
  },

  integrations: [react()],
  output: "server",

  adapter: node({
    mode: "standalone",
  }),
});
