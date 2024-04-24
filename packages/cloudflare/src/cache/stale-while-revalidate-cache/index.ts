import type {
  KVNamespaceGetWithMetadataResult,
  KVNamespace,
  ExecutionContext,
} from "@cloudflare/workers-types";
import {
  logger,
  parseSWRCacheControlHeader,
  type ParseSWRCacheControlHeader,
  setServerTimingMetrics,
  Timer,
} from "@project/common";

const KV_GET_TIMER_NAME = "cache get";
const KV_PUT_TIMER_NAME = "cache update";
const TOTAL_TIMER_NAME = "total cache runtime";

type WithMetadata = {
  expires: number;
  maxAge: number;
  swr?: number;
};

type Next = () => Promise<Response>;

/**
 * Implements a stale-while-revalidate caching strategy using Cloudflare Workers KV.
 * @async
 * @function staleWhileRevalidateCache
 * @param {KVNamespace} kv - The KV namespace to use for caching.
 * @param {string} pathname - The pathname of the request.
 * @param {Next} next - The function to call to get the next response when the cache is stale or not present.
 * @param {ExecutionContext} executionContext - The execution context of the worker.
 * @returns {Promise<Response>} The response, either from the cache or from the `next` function.
 */
export async function staleWhileRevalidateCache(
  kv: KVNamespace,
  pathname: string,
  next: Next,
  executionContext: ExecutionContext
) {
  let cache: KVNamespaceGetWithMetadataResult<ArrayBuffer, WithMetadata> | null = null;

  const timer = new Timer();
  timer.time(TOTAL_TIMER_NAME);

  timer.time(KV_GET_TIMER_NAME);

  try {
    cache = await kv.getWithMetadata<WithMetadata>(pathname, {
      type: "arrayBuffer",
      cacheTtl: 86400 * 7, // 1 week
    });
  } catch (e) {
    logger.error(JSON.stringify(e));
  }

  timer.timeEnd(KV_GET_TIMER_NAME);

  if (cache?.value && cache?.metadata?.maxAge && cache?.metadata?.swr) {
    const cachedRes = new Response(cache.value, {
      headers: {
        "cache-control": `public, max-age=${cache.metadata.maxAge}, stale-while-revalidate=${cache.metadata.swr}`,
        "content-type": "text/html",
      },
    });

    if (cache?.metadata && Date.now() > cache.metadata.expires) {
      executionContext.waitUntil(
        updateCache(
          next,
          pathname,
          kv,
          expiresAt(cache.metadata.maxAge),
          cache.metadata.maxAge,
          cache.metadata.swr
        )
      );
    }

    timer.timeEnd(TOTAL_TIMER_NAME);

    setServerTimingMetrics(cachedRes, timer);

    return cachedRes;
  }

  const response = await next();

  const cacheControlHeader = response.headers.get("cache-control");

  let cacheControl: ParseSWRCacheControlHeader | null = null;

  if (cacheControlHeader) cacheControl = parseSWRCacheControlHeader(cacheControlHeader);

  if (!cacheControl?.maxAge || !cacheControl?.staleWhileRevalidate) return response;

  timer.time(KV_PUT_TIMER_NAME);

  await updateCache(
    next,
    pathname,
    kv,
    expiresAt(cacheControl.maxAge),
    cacheControl.maxAge,
    cacheControl.staleWhileRevalidate
  );

  timer.timeEnd(KV_PUT_TIMER_NAME);

  timer.timeEnd(TOTAL_TIMER_NAME);

  setServerTimingMetrics(response, timer);

  return response;
}

async function updateCache(
  next: Next,
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
