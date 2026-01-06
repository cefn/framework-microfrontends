import { unsafeKeys, type MemberOf } from "./util";

export const DOWNSTREAM_PORT = 3000;

export const UPSTREAM_ADDRESS = {
  astro: "http://localhost:3001",
  next: "http://localhost:3002",
  reactrouter: "http://localhost:3003",
  tanstack: "http://localhost:3004",
  vike: "http://localhost:3005",
  vite: "http://localhost:3006",
} as const;

export const UPSTREAM_NAMES = unsafeKeys(UPSTREAM_ADDRESS);

export type UpstreamName = MemberOf<typeof UPSTREAM_NAMES>;
