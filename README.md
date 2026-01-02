# framework-microfrontends

Establishes if and how various React frameworks can be used to create
server-rendered page 'fragments' that can be inlined in a pre-existing page and
then client-hydrated.

The project hopes to establish configurations for embeddable pages from
`Next.js`, `react-router`, `tanstack-start`, `astro`, `vite` and perhaps other
React metaframeworks.

This involves working around the assumptions built in to each framework (which
typically believe they control every part of the page). However, this assumption
is violated when the rendered HTML is actually embedded inside another page.

## Demo

Run `pnpm demo` to bring up the `downstream-aggregator` on port 3000 as well as
the following pre-built upstream servers, each on a different port...

- `upstream-astro`
- `upstream-reactrouter`
- `upstream-tanstack`

Embedded pages from each upstream server can be viewed like...

http://localhost:3000/astro/somepage

All upstream servers are React SSR framworks. They use the same async loader and
React components to render HTML echoing back the name of the framework, the page
name, a dynamically-constructed message, and a minimal client-side onload
behaviour that proves clientside javascript is loading.

## Detailed approach

This monorepo contains a `downstream-aggregator` - a minimal webserver based on
express that loads pages from upstream servers and inlines those rendered pages
in a templated page.

Architecturally, the downstream server would look after e.g. session
negotiation, localisation, layout etc. while the upstream server would be
dedicated to rendering a specific microfrontend, receiving simple requests,
loading data for its microfrontend, and rendering it into an SSR HTML fragment
with accompanying script tags for client hydration.

This monorepo can also be used for prototyping 'runtime' mechanisms that allow
the microfrontend to interact with host-managed state, such as login identity.

In each case the 'upstream' server takes responsibility for server-side
rendering the page, and adding script elements to load and launch client-side
bundles for hydration. The downstream server simply inlines the resulting page
as a microfrontend.
