import { type loadPageProps } from "shared-components";
import { type VITE_APP_UID } from "./config";

declare global {
  interface Window {
    // Declare the property and its type.
    // Use 'readonly' if you intend for it not to be reassigned in client-side JS.
    // Use '?' if it might not always be present (though your question implies it is).
    [VITE_APP_UID]: { pageProps?: Awaited<ReturnType<typeof loadPageProps>> }; // Or a more specific type if you know it, e.g., { user: { name: string } }
  }
}
