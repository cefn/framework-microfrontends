import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const REACTROUTER_PORT = 3003;
const REACTROUTER_HOST = "localhost";
const REACTROUTER_ORIGIN = `http://${REACTROUTER_HOST}:${REACTROUTER_PORT}`;

export default defineConfig({
  // base: `${REACTROUTER_ORIGIN}/`,
  // publicDir: `./build/client/`,
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    port: REACTROUTER_PORT,
    // origin: REACTROUTER_ORIGIN,
  },
});
