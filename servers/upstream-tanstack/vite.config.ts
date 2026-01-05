import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { CORS_ORIGIN, TANSTACK_ORIGIN, TANSTACK_PORT } from "./src/config";

export default defineConfig({
  base: TANSTACK_ORIGIN,
  server: {
    port: TANSTACK_PORT,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
  nitro: {
    routeRules: {
      "/assets/**": {
        cors: true,
        headers: {
          "access-control-allow-methods": "GET",
          "access-control-allow-origin": CORS_ORIGIN,
        },
      },
    },
  },
});
