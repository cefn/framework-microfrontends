// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import node from "@astrojs/node";

const ASTRO_HOST = "localhost";
const ASTRO_PORT = 3001;
const ASTRO_ORIGIN = `http://${ASTRO_HOST}:${ASTRO_PORT}`;

// https://astro.build/config
export default defineConfig({
  server: {
    port: ASTRO_PORT,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
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
