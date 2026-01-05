// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import node from "@astrojs/node";

import { ASTRO_ORIGIN, ASTRO_PORT, CORS_ORIGIN } from "./src/config";

// https://astro.build/config
export default defineConfig({
  server: {
    port: ASTRO_PORT,
    headers: {
      "Access-Control-Allow-Origin": CORS_ORIGIN,
    },
  },
  site: ASTRO_ORIGIN,
  build: {
    assetsPrefix: ASTRO_ORIGIN,
  },

  integrations: [react()],
  output: "server",

  adapter: node({
    mode: "standalone",
  }),
});
