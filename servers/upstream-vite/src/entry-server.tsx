import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import { Page, loadPageProps } from "shared-components";

import { VITE_UPSTREAM_NAME, VITE_APP_UID } from "./config";

export async function render(url: string) {
  const [_upstreamName, pageName] = url.split("/");
  if (!pageName) {
    throw new Error("No pageName provided");
  }
  const pageProps = await loadPageProps({
    pageName,
    upstreamName: VITE_UPSTREAM_NAME,
  });
  const js = `window['${VITE_APP_UID}']=${JSON.stringify({ pageProps })}`;
  const html = renderToString(
    <StrictMode>
      <Page {...pageProps} />
    </StrictMode>,
  );
  return { js, html };
}
