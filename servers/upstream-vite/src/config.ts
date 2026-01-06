export const VITE_UPSTREAM_NAME = "vite";
export const VITE_PORT = 3006;
export const VITE_HOST = "localhost";
export const VITE_ORIGIN = `http://${VITE_HOST}:${VITE_PORT}`;

export const CORS_ORIGIN = "http://localhost:3000";

// Unique sha of first commit that added this package folder
// git log --reverse  --pretty='%h %cI' -- . | head -1 | cut -f1 -d' '
export const MICROFRONTEND_UID = "microfrontend-a0370b9";
