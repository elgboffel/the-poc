import { logger } from "@project/common";
import type { APIContext, MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import {
  type ParseCacheControlHeader,
  parseCacheControlHeader,
} from "../common/headers/parse-cache-control-heder.ts";
import { setServerTimingMetrics } from "../common/headers/set-server-timing-metrics.ts";
import { Timer } from "../timer.js";

const isDev = import.meta.env.DEV;

export const staleWhileRevalidateCache = defineMiddleware(async (context, next) => {
  const response = await next();
  const cacheControlHeader = response.headers.get("cache-control");

  let cacheControl: ParseCacheControlHeader | null = null;

  if (cacheControlHeader) cacheControl = parseCacheControlHeader(cacheControlHeader);

  context.locals.swr = cacheControl?.maxAge ?? 0;

  if (isDev) return response;

  if (!context.locals.runtime?.env || !cacheControl?.maxAge) return response;

  const timer = new Timer();

  timer.time("KV_GET");

  const { KV_SWR } = context.locals.runtime.env;

  let cache;

  try {
    cache = await KV_SWR.getWithMetadata<{ expires: number }>(context.url.pathname, {
      type: "arrayBuffer",
    });
  } catch (e) {
    logger.error(JSON.stringify(e));
  }
  console.log({ cache });
  console.log("now", Date.now());
  console.log("cache", cache?.metadata && Date.now() < cache.metadata.expires);

  timer.timeEnd("KV_GET");

  if (!cache?.value) {
    await updateCache(next, context, KV_SWR, cacheControl?.maxAge);

    setServerTimingMetrics(response, timer);

    return response;
  }

  const cachedRes = new Response(cache.value, {
    headers: response.headers,
  });

  if (cache.metadata && Date.now() < cache.metadata.expires) {
    setServerTimingMetrics(cachedRes, timer);
    return cachedRes;
  }

  await updateCache(next, context, KV_SWR, cacheControl?.maxAge);

  setServerTimingMetrics(cachedRes, timer);
  return cachedRes;
});

async function updateCache(
  next: MiddlewareNext,
  context: APIContext<Record<string, any>>,
  kv: KVNamespace,
  swr: number
) {
  const res = await next();
  const buffer = await res.arrayBuffer();
  console.log("time", new Date().getTime());
  console.log("swr", swr);
  console.log("time date", Date.now() + swr * 1000);
  try {
    await kv.put(context.url.pathname, buffer, {
      metadata: { expires: Date.now() + swr * 1000 },
    });
  } catch (e) {
    logger.error(JSON.stringify(e));
  }
}
