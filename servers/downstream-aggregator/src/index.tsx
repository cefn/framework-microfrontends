import express, { type ErrorRequestHandler } from "express";
import { renderToString } from "preact-render-to-string";
import { UPSTREAM_NAMES, DOWNSTREAM_PORT } from "./config";
import { promiseEmbeddedHtml, promiseServer } from "./server";
import { isMember } from "./util";

const app = express();

// establish landing page with links to each upstream
app.get("/", (_req, res, next) => {
  const examplePageName = "examplePage";
  try {
    res.status(200).send(
      `<!DOCTYPE html>` +
        renderToString(
          <html>
            <body>
              <h1>All upstreams</h1>
              <ul>
                {UPSTREAM_NAMES.map((upstreamName) => (
                  <li key={upstreamName}>
                    <a href={`/${upstreamName}/${examplePageName}`}>
                      {upstreamName}
                    </a>
                  </li>
                ))}
              </ul>
            </body>
          </html>,
        ),
    );
  } catch (error) {
    next(error);
  }
});

app.get("/:upstreamName/:pageName", (req, res, next) => {
  const { upstreamName, pageName } = req.params;

  if (!isMember(UPSTREAM_NAMES, upstreamName)) {
    throw new Error(`${upstreamName} is not a member of ${UPSTREAM_NAMES}`);
  }

  if (!pageName) {
    return next(
      new Error(
        `Must provide a pageName like 'http://hostName:hostPort/upstreamName/pageName'`,
      ),
    );
  }

  promiseEmbeddedHtml({ upstreamName, pageName })
    .then((html) => res.status(200).send(html))
    .catch(next);
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send(`Something broke! ${err.message}`);
};

app.use(errorHandler);

const server = await promiseServer(app, DOWNSTREAM_PORT);

console.log(`Server running on port ${DOWNSTREAM_PORT}`);

await new Promise<void>((resolve) => {
  const signalHandler = () => {
    process.off("SIGINT", signalHandler);
    resolve();
  };
  process.on("SIGINT", signalHandler);
});

server.close();
