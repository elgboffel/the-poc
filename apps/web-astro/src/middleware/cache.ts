import { defineMiddleware } from "astro:middleware";

type Path = string;

type CachedResponse = {
  response: Response;
  expires: number;
}

const store = new Map<Path, CachedResponse>();

export const cache = defineMiddleware(async (context, next) => {
  let ttl: number | undefined;

  if (!context.locals.runtime?.env) return await next();

  const { KV } = context.locals.runtime.env;
  const buffer = await (await next()).clone().arrayBuffer();
  await KV.put(context.url.pathname, buffer, { expirationTtl: 60 });
  const test = await KV.get(context.url.pathname, { type: "arrayBuffer" });
  const newRes = test ? new Response(test) : null;

  if (newRes)
    return newRes.clone();

  // Add a `cache` method to the `req.locals` object
  // that will allow us to set the cache duration for each page.
  context.locals.cache = (seconds: number = 60) => {
    ttl = seconds;
  };

  const cached = store.get(context.url.pathname);

  if (cached && cached.expires > Date.now()) {
    return cached.response.clone();
  } else if (cached) {
    store.delete(context.url.pathname);
  }

  const response = await next();

  // If the `cache` method was called, store the response in the cache.
  if (ttl !== undefined) {
    store.set(
      context.url.pathname,{
        response: response.clone(),
        expires: Date.now() + ttl * 1000,
      }
    );
  }

  return response;
});
