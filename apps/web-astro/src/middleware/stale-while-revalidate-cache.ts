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
    cache = await KV_SWR.get<{ response: string; expires: number }>(
      context.url.pathname,
      { type: "json" }
    );
  } catch (e) {
    logger.error(JSON.stringify(e));
  }

  timer.timeEnd("KV_GET");

  if (!cache) {
    updateCache(next, context, KV_SWR, cacheControl?.maxAge);

    setServerTimingMetrics(response, timer);

    return response;
  }

  const cachedRes = new Response(cache.response, {
    headers: response.headers,
  });

  if (cache && cache.expires >= Date.now()) {
    setServerTimingMetrics(cachedRes, timer);
    return cachedRes;
  }

  updateCache(next, context, KV_SWR, cacheControl?.maxAge);

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
  const body = new TextDecoder("utf-8").decode(buffer ?? undefined);

  try {
    await kv.put(
      context.url.pathname,
      JSON.stringify({
        response: body,
        expires: Date.now() + swr * 1000,
      })
    );
  } catch (e) {
    logger.error(JSON.stringify(e));
  }
}
