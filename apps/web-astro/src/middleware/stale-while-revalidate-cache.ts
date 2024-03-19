import { logger } from "@project/common";
import type { APIContext, MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { Timer } from "../timer.js";

export const staleWhileRevalidateCache = defineMiddleware(async (context, next) => {
  const swr = context.locals.swr;

  const isDev = import.meta.env.DEV;

  if (isDev) return await next();

  const timer = new Timer();

  if (!context.locals.runtime?.env || !swr) return await next();

  const { KV_SWR } = context.locals.runtime.env;

  timer.time("KV_GET");
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
    updateCache(next, context, KV_SWR, swr);

    const res = await next();

    setServerTimingMetrics(res, timer);

    return res;
  }

  const cachedRes = new Response(new TextEncoder().encode(cache.response));

  if (cache && cache.expires > Date.now()) {
    setServerTimingMetrics(cachedRes, timer);
    return cachedRes;
  }

  updateCache(next, context, KV_SWR, swr);

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

function setServerTimingMetrics(res: Response, timer: Timer) {
  res.headers.set(
    "Server-Timing",
    Array.from(timer.allTimes()).reduce(
      (acc, [key, value], index) =>
        `${acc}${index === 0 ? "" : ", "}${key};dur=${value.value}`,
      ""
    )
  );
}
