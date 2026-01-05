import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { REACTROUTER_PORT, REACTROUTER_ORIGIN } from "./src/config";

export default defineConfig({
  // base: `${REACTROUTER_ORIGIN}/`,
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    port: REACTROUTER_PORT,
    // origin: REACTROUTER_ORIGIN,
  },
});
