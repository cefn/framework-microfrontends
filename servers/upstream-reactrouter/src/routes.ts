import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { REACTROUTER_UPSTREAM_NAME } from "./config";

export default [
  index("./routes/home.tsx"),
  route(`/${REACTROUTER_UPSTREAM_NAME}/:pageName`, "./routes/page.tsx"),
] satisfies RouteConfig;
