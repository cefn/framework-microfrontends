import { type Application } from "express";
import http from "node:http";
import { renderToString } from "preact-render-to-string";
import { UPSTREAM_ADDRESS, type UpstreamName } from "./config";

/** Retrieves an upstream-rendered page, inlining its HTML within a minimal HTML page */
export async function promiseEmbeddedHtml(options: {
  upstreamName: UpstreamName;
  pageName: string;
}) {
  const { upstreamName, pageName } = options;
  const upstreamAddress = `${UPSTREAM_ADDRESS[upstreamName]}/${pageName}`;
  const response = await fetch(upstreamAddress);
  const { status } = response;

  if (status !== 200) {
    throw new Error(
      `Unexpected status ${status} requesting ${upstreamAddress}`,
    );
  }

  const contentType = response.headers.get("Content-Type");
  if (!contentType?.includes("html")) {
    throw new Error(
      `Unexpected Content-Type ${contentType} requesting ${upstreamAddress}`,
    );
  }

  const upstreamHtml = await response.text();
  return embedHtml({ pageName, upstreamName, upstreamHtml });
}

/** Creates a html page, containing the inlined HTML */
function embedHtml(options: {
  upstreamName: string;
  upstreamHtml: string;
  pageName: string | undefined;
}) {
  const { upstreamName, upstreamHtml, pageName } = options;
  return (
    `<!DOCTYPE html>` +
    renderToString(
      <html>
        <head>
          <title>{`Embedding ${pageName} from ${upstreamName}`}</title>
        </head>
        <body>
          <h1>Aggregator template content</h1>
          <p>
            This page has an embedded '{upstreamName}' page{" "}
            {pageName ? `'${pageName}'` : ""} in it
          </p>
          <div dangerouslySetInnerHTML={{ __html: upstreamHtml }} />
        </body>
      </html>,
    )
  );
}

/** Launch express server (throwing for any error event) */
export function promiseServer(app: Application, PORT: number) {
  return new Promise<http.Server>((resolve, reject) => {
    const onLaunchError = (error: unknown) => {
      reject(error);
    };
    const launched = app.listen(PORT);
    launched.once("error", onLaunchError);
    launched.once("listening", () => {
      launched.off("error", onLaunchError);
      resolve(launched);
    });
  });
}
