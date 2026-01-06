import type { MiddlewareHandler } from "astro";

export async function onRequest(...params: Parameters<MiddlewareHandler>) {
  const [_context, next] = params;
  const response = await next();

  if (response.text) {
    const text = await response.text();
    return new Response(text.replace(/<!doctype html>/i, ""), response);
  }

  return response;
}
