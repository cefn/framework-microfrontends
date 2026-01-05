import { createFileRoute } from "@tanstack/react-router";
import { Page, loadPageProps } from "shared-components";
import { TANSTACK_UPSTREAM_NAME } from "~/config";

export const Route = createFileRoute(`/${TANSTACK_UPSTREAM_NAME}/$pageName`)({
  loader: async ({ params }) => {
    const { pageName } = params;
    const pageProps = await loadPageProps({
      upstreamName: TANSTACK_UPSTREAM_NAME,
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
