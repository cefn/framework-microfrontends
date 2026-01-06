"use client";

import { useEffect, useState } from "react";
import { type PageProps } from "./types";

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
      <h1>Shared templated component</h1>
      <p>
        '{pageName}' served by {upstreamName}
      </p>
      <p>{upstreamMessage}</p>
      <p>Client code is {isLoaded ? "Loaded" : "Not Loaded"}</p>
    </div>
  );
}
