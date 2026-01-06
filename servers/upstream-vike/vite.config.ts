import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import { CORS_ORIGIN, VIKE_PORT } from "./config";

export default defineConfig({
  plugins: [vike(), react()],
  server: {
    port: VIKE_PORT,
  },
  preview: {
    cors: {
      origin: CORS_ORIGIN,
    },
  },
});
