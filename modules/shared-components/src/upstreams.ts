import { unsafeKeys, type MemberOf } from "./util";

export const UPSTREAM_PORT = {
  astro: 3001,
  next: 3002,
  reactrouter: 3003,
  tanstack: 3004,
  vike: 3005,
  vite: 3006,
} as const;

export const UPSTREAM_NAMES = unsafeKeys(UPSTREAM_PORT);

export type UpstreamName = MemberOf<typeof UPSTREAM_NAMES>;

export function getUpstreamDefinition<Name extends UpstreamName>(
  name: Name,
  host = "http://localhost",
  cors = "*",
) {
  const port = UPSTREAM_PORT[name];
  const origin = `${host}:${port}`;
  return {
    name,
    host,
    port,
    origin,
    cors,
  } as const;
}
