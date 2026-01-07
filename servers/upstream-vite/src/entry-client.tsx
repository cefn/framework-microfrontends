import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { Page } from "shared-components";
import { MICROFRONTEND_UID } from "./microfrontendDef";

const pageProps = window[MICROFRONTEND_UID]?.pageProps;
if (!pageProps) {
  throw new Error("Could not load page data");
}

const pageRoot = document.getElementById(MICROFRONTEND_UID);
if (!pageRoot) {
  throw new Error("Could not identify mount point");
}

hydrateRoot(
  pageRoot,
  <StrictMode>
    <Page {...pageProps} />
  </StrictMode>,
);
