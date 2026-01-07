import { createFileRoute } from "@tanstack/react-router";
import { Page, loadPageProps } from "shared-components";
import { upstream } from "~/upstreamDef";

export const Route = createFileRoute(`/${upstream.name}/$pageName`)({
  loader: async ({ params }) => {
    const { pageName } = params;
    const pageProps = await loadPageProps({
      upstreamName: upstream.name,
      pageName,
    });
    return pageProps;
  },
  component: () => {
    const pageProps = Route.useLoaderData();
    return (
      <>
        <h1>Tanstack templated content</h1>
        <p>
          This tanstack page '{pageProps.pageName}' contains a React <i>Page</i>{" "}
          component
        </p>
        <Page {...pageProps} />;
      </>
    );
  },
});
