import type { Route } from "./+types/page";

import { Page, loadPageProps } from "shared-components";

const upstreamName = "reactrouter";

export async function loader({ params }: Route.LoaderArgs) {
  const { pageName } = params;
  return await loadPageProps({
    upstreamName,
    pageName,
  });
}

export default function render({ loaderData }: Route.ComponentProps) {
  return <Page {...loaderData} />;
}
