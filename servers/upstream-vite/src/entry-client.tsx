import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { Page } from "shared-components";
import { VITE_APP_UID } from "./config";

const pageProps = window[VITE_APP_UID]?.pageProps;

const pageRoot = document.getElementById(VITE_APP_UID);

if (!pageProps) {
  throw new Error("Could not load page data");
}

if (!pageRoot) {
  throw new Error("Could not identify mount point");
}

hydrateRoot(
  pageRoot,
  <StrictMode>
    <Page {...pageProps} />
  </StrictMode>,
);
