import { logger } from "@project/common";
import type { APIContext, MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import {
  type ParseCacheControlHeader,
  parseCacheControlHeader,
} from "../common/headers/parse-cache-control-heder.ts";
import { setServerTimingMetrics } from "../common/headers/set-server-timing-metrics.ts";
import { Timer } from "../timer.js";
import { skipMiddleware } from "./pass-through-routes.ts";

const isDev = import.meta.env.DEV;

export const staleWhileRevalidateCache = defineMiddleware(async (context, next) => {
  const timer = new Timer();
  timer.time("total");

  if (isDev) return next();

  if (!context.locals.runtime?.env) return next();

  timer.time("KV_GET");

  const { KV_SWR } = context.locals.runtime.env;

  let cache;

  try {
    cache = await KV_SWR.getWithMetadata<{ expires: number; ttl: number }>(
      context.url.pathname,
      {
        type: "arrayBuffer",
      }
    );
  } catch (e) {
    logger.error(JSON.stringify(e));
  }

  timer.timeEnd("KV_GET");

  if (cache?.value && cache.metadata?.ttl) {
    const cachedRes = new Response(cache.value, {
      headers: context.request.headers,
    });

    if (cache?.metadata && Date.now() > cache.metadata.expires) {
      context.locals.runtime.waitUntil(
        updateCache(
          next,
          context.url.pathname,
          KV_SWR,
          expiresAt(cache.metadata.ttl),
          cache.metadata.ttl
        )
      );
    }

    timer.timeEnd("total");

    setServerTimingMetrics(cachedRes, timer);

    return cachedRes;
  }

  const response = await next();

  const cacheControlHeader = response.headers.get("cache-control");

  let cacheControl: ParseCacheControlHeader | null = null;

  if (cacheControlHeader) cacheControl = parseCacheControlHeader(cacheControlHeader);

  if (!cacheControl?.maxAge) return response;

  timer.time("KV_PUT");

  await updateCache(
    next,
    context.url.pathname,
    KV_SWR,
    expiresAt(cacheControl.maxAge),
    cacheControl?.maxAge
  );

  timer.timeEnd("KV_PUT");

  timer.timeEnd("total");

  setServerTimingMetrics(response, timer);
  return response;
});

async function updateCache(
  next: MiddlewareNext,
  pathname: string,
  kv: KVNamespace,
  expires: number,
  ttl: number
) {
  const res = await next();
  const buffer = await res.arrayBuffer();

  try {
    await kv.put(pathname, buffer, {
      metadata: { expires, ttl },
    });
  } catch (e) {
    logger.error(JSON.stringify(e));
  }
}

function expiresAt(ttl: number) {
  return Date.now() + ttl * 1000;
}
