import type { PageProps } from "./types";

let impressionCounter = 0;

/** Function intended to be run server-side to populate data for a Page */
export async function loadPageProps(options: {
  upstreamName: string;
  pageName: string;
}): Promise<PageProps> {
  const { upstreamName, pageName } = options;
  const upstreamMessage = `Impression count ${impressionCounter++}`;
  return {
    upstreamName,
    upstreamMessage,
    pageName,
  } as const;
}
