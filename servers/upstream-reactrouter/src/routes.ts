import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { upstream } from "./upstreamDef";

export default [
  index("./routes/home.tsx"),
  route(`/${upstream.name}/:pageName`, "./routes/page.tsx"),
] satisfies RouteConfig;
