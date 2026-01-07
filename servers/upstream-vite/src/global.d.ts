import { type loadPageProps } from "shared-components";
import { type MICROFRONTEND_UID } from "./microfrontendDef";

declare global {
  interface Window {
    [MICROFRONTEND_UID]: {
      pageProps?: Awaited<ReturnType<typeof loadPageProps>>;
    };
  }
}
