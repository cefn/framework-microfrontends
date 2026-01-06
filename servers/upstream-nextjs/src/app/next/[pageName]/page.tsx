import { loadPageProps, Page } from "shared-components";

import { NEXT_UPSTREAM_NAME } from "../../../config";

export default async function Fragment({
  params,
}: {
  params: Promise<{ pageName?: string }>;
}) {
  const { pageName } = await params;
  if (typeof pageName !== "string") {
    throw new Error("No pageName provided");
  }
  const pageProps = await loadPageProps({
    pageName,
    upstreamName: NEXT_UPSTREAM_NAME,
  });
  return (
    <>
      <h1>Next templated content</h1>
      <p>
        This next page '{pageName}' contains a React <i>Page</i> component
      </p>
      <Page {...pageProps} />;
    </>
  );
}
