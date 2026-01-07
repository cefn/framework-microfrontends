import { upstream } from "~/upstreamDef";
import type { Route } from "./+types/page";

import { Page, loadPageProps } from "shared-components";

export async function loader({ params }: Route.LoaderArgs) {
  const { pageName } = params;
  return await loadPageProps({
    upstreamName: upstream.name,
    pageName,
  });
}

export default function render({ loaderData }: Route.ComponentProps) {
  const { pageName } = loaderData;
  return (
    <>
      <h1>React-router templated content</h1>
      <p>
        This react-router page '{pageName}' contains a React <i>Page</i>{" "}
        component
      </p>
      <Page {...loaderData} />;
    </>
  );
}
