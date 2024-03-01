import { defineMiddleware } from "astro:middleware";

export const staleWhileRevalidateCache = defineMiddleware(async (context, next) => {
  const swr = context.locals.swr ?? 5
  console.log({ swr })
  console.log(context.locals.runtime)
  if (!context.locals.runtime?.env || !swr) return await next();

  const { KV_SWR } = context.locals.runtime.env;

  const cached = await KV_SWR.get<{ response: string; expires: number; }>(context.url.pathname, { type: "json" });

  if(!cached)
    return await next();

  const cachedRes = new Response(cached.response);

  if (cached && cached.expires > Date.now()) {
    return cachedRes;
  }

  const res = await next();
  const buffer = await res.arrayBuffer();
  const body = new TextDecoder('utf-8').decode(buffer ?? undefined);

  await KV_SWR.put(
    context.url.pathname,JSON.stringify({
      response: body,
      expires: Date.now() + swr * 1000,
    }
  ));

  return cachedRes;
});
