import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { VITE_APP_UID, VITE_ORIGIN } from "./src/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "inline-app-uid",
      transformIndexHtml(html, ctx) {
        return html.replace('id="root"', `id="${VITE_APP_UID}"`);
      },
    },
  ],
  experimental: {
    renderBuiltUrl(fileName) {
      return `${VITE_ORIGIN}/${fileName}`;
    },
  },
});
