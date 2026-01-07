import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { MICROFRONTEND_UID } from "./src/microfrontendDef";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "inline-app-uid",
      transformIndexHtml(html, ctx) {
        return html.replace('id="root"', `id="${MICROFRONTEND_UID}"`);
      },
    },
  ],
  experimental: {
    renderBuiltUrl(fileName) {
      return `http://localhost:3006/${fileName}`;
    },
  },
});
