import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { upstream } from "./src/upstreamDef";

export default defineConfig({
  base: upstream.origin,
  server: {
    port: upstream.port,
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
          "access-control-allow-origin": upstream.cors,
        },
      },
    },
  },
});
