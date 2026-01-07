import express, { type ErrorRequestHandler } from "express";
import { renderToString } from "preact-render-to-string";
import {
  getUpstreamDefinition,
  isMember,
  UPSTREAM_NAMES,
} from "shared-components";
import { promiseInlinedHtml, promiseServer } from "./server";

const app = express();

const { PORT } = process.env;
const port = PORT ? Number(PORT) : 3000;

// establish landing page with links to each upstream
app.get("/", function landing(_req, res, next) {
  const examplePageName = "examplePage";
  try {
    res.status(200).send(
      `<!DOCTYPE html>` +
        renderToString(
          <html>
            <body>
              <h1>All upstreams</h1>
              <ul>
                {UPSTREAM_NAMES.map((upstreamName) => {
                  const upstream = getUpstreamDefinition(upstreamName);
                  return (
                    <li key={upstreamName}>
                      {upstreamName}:
                      <ul>
                        <li>
                          <a
                            href={`${upstream.origin}/${upstreamName}/somepage`}
                          >
                            direct
                          </a>
                        </li>
                        <li>
                          <a href={`/${upstreamName}/${examplePageName}`}>
                            injected
                          </a>
                        </li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </body>
          </html>,
        ),
    );
  } catch (error) {
    next(error);
  }
});

app.get(
  "/:upstreamName/:pageName",
  function inlineUpstreamPage(req, res, next) {
    const { upstreamName, pageName } = req.params;

    if (!upstreamName || !pageName) {
      return next(
        new Error(
          `Must provide a pageName and upstreamName like 'http://hostName:hostPort/upstreamName/pageName'`,
        ),
      );
    }

    if (!isMember(UPSTREAM_NAMES, upstreamName)) {
      throw new Error(`${upstreamName} is not a member of ${UPSTREAM_NAMES}`);
    }

    promiseInlinedHtml({ upstreamName, pageName })
      .then((html) => res.status(200).send(html))
      .catch(next);
  },
);

app.use(((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send(`Something broke! ${err.message}`);
}) satisfies ErrorRequestHandler);

const server = await promiseServer(app, port);
console.log(`Server running on port ${port}`);

await new Promise<void>((resolve) => {
  process.on("SIGINT", resolve);
});
server.close();
