import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vike(), react()],
  server: {
    port: 3005,
  },
  preview: {
    cors: {
      origin: "http://localhost:3000",
    },
  },
});
