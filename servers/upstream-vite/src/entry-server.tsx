import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import { Page, loadPageProps } from "shared-components";
import { upstream } from "./upstreamDef";
import { MICROFRONTEND_UID } from "./microfrontendDef";

export async function render(url: string) {
  const [_upstreamName, pageName] = url.split("/");
  if (!pageName) {
    throw new Error("No pageName provided");
  }
  const pageProps = await loadPageProps({
    pageName,
    upstreamName: upstream.name,
  });
  const js = `window['${MICROFRONTEND_UID}']=${JSON.stringify({ pageProps })}`;
  const html = renderToString(
    <StrictMode>
      <Page {...pageProps} />
    </StrictMode>,
  );
  return { js, html };
}
