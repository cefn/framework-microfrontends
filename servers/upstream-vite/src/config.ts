export const VITE_UPSTREAM_NAME = "vite";
export const VITE_PORT = 3006;
export const VITE_HOST = "localhost";
export const VITE_ORIGIN = `http://${VITE_HOST}:${VITE_PORT}`;

export const CORS_ORIGIN = "http://localhost:3000";

// Short sha is the result of running
// git rev-list --all --max-parents=0 --no-commit-header --pretty='%h %cI' | sort -k2 | head -1 | cut -f1 -d' '
export const VITE_APP_UID = "vite-injectable-c4b5283";
