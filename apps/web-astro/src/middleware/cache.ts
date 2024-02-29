import { defineMiddleware } from "astro:middleware";

export const cache = defineMiddleware(async (context, next) => {
  const ttl = context.locals.ttl

  if (!context.locals.runtime?.env || ttl) return await next();

  const { KV } = context.locals.runtime.env;
  const cachedBuffer = await KV.get(context.url.pathname, { type: "arrayBuffer" });

  if (cachedBuffer)
    return new Response(cachedBuffer);

  const res = await next();
  const buffer = await res.arrayBuffer();

  await KV.put(context.url.pathname, buffer, { expirationTtl: 60 });

  return new Response(buffer);
});
