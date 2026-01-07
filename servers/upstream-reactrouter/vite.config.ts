import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // base: `${REACTROUTER_ORIGIN}/`,
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    // origin: REACTROUTER_ORIGIN,
  },
});
