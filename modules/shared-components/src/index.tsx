import { useEffect, useState } from "react";

export interface PageProps {
  upstreamName: string;
  upstreamMessage: string;
  pageName: string;
}

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

function useIsLoaded() {
  const [isLoaded, setIsLoaded] = useState(false);

  // only executes if client code is loaded
  useEffect(() => setIsLoaded(true), []);

  return {
    isLoaded,
  };
}

export function Page(props: PageProps) {
  const { upstreamName, upstreamMessage, pageName } = props;
  const { isLoaded } = useIsLoaded();
  return (
    <div>
      <h1>React templated content</h1>
      <p>
        '{pageName}' served by {upstreamName}
      </p>
      <p>{upstreamMessage}</p>
      <p>Client code is {isLoaded ? "Loaded" : "Not Loaded"}</p>
    </div>
  );
}
