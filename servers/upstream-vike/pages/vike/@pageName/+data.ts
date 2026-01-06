import type { PageContextServer } from "vike/types";

import { loadPageProps } from "shared-components";

import { VIKE_UPSTREAM_NAME } from "../../../config";

export type Data = Awaited<ReturnType<typeof data>>;

export default async function data(pageContext: PageContextServer) {
  const routeParams: Partial<Record<string, string>> = pageContext.routeParams;
  const { pageName } = routeParams;

  if (typeof pageName !== "string") {
    throw new Error("No pageName provided");
  }

  return await loadPageProps({
    pageName,
    upstreamName: VIKE_UPSTREAM_NAME,
  });
}
