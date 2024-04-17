import type { KVNamespaceGetWithMetadataResult } from "@cloudflare/workers-types";
import { logger } from "@project/common";
import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import {
  type ParseCacheControlHeader,
  parseCacheControlHeader,
} from "../common/headers/parse-cache-control-heder.ts";
import { setServerTimingMetrics } from "../common/headers/set-server-timing-metrics.ts";
import { Timer } from "../timer.js";

const isDev = import.meta.env.DEV;

type WithMetadata = {
  expires: number;
  maxAge: number;
  swr?: number;
};

export const staleWhileRevalidateCache = defineMiddleware(async (context, next) => {
  if (isDev) return next();

  if (!context.locals.runtime?.env) return next();

  const { KV_SWR } = context.locals.runtime.env;

  let cache: KVNamespaceGetWithMetadataResult<ArrayBuffer, WithMetadata> | null = null;

  const timer = new Timer();
  timer.time("total");

  timer.time("KV_GET");

  try {
    cache = await KV_SWR.getWithMetadata<WithMetadata>(context.url.pathname, {
      type: "arrayBuffer",
    });
  } catch (e) {
    logger.error(JSON.stringify(e));
  }

  timer.timeEnd("KV_GET");

  if (cache?.value && cache?.metadata?.maxAge && cache?.metadata?.swr) {
    const cachedRes = new Response(cache.value, {
      headers: {
        "cache-control": `public, max-age=${cache.metadata.maxAge}, stale-while-revalidate=${cache.metadata.swr}`,
        "content-type": "text/html",
      },
    });

    if (cache?.metadata && Date.now() > cache.metadata.expires) {
      context.locals.runtime.waitUntil(
        updateCache(
          next,
          context.url.pathname,
          KV_SWR,
          expiresAt(cache.metadata.maxAge),
          cache.metadata.maxAge,
          cache.metadata.swr
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

  if (!cacheControl?.maxAge || !cacheControl?.staleWhileRevalidate) return response;

  timer.time("KV_PUT");

  await updateCache(
    next,
    context.url.pathname,
    KV_SWR,
    expiresAt(cacheControl.maxAge),
    cacheControl.maxAge,
    cacheControl.staleWhileRevalidate
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
  maxAge: number,
  swr: number
) {
  const res = await next();
  const buffer = await res.arrayBuffer();

  try {
    await kv.put(pathname, buffer, {
      metadata: { expires, maxAge, swr } as WithMetadata,
    });
  } catch (e) {
    logger.error(JSON.stringify(e));
  }
}

function expiresAt(ttl: number) {
  return Date.now() + ttl * 1000;
}
