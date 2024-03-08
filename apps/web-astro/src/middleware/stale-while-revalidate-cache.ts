import type { APIContext, MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { Timer } from "../timer.ts";

export const staleWhileRevalidateCache = defineMiddleware(async (context, next) => {
  const swr = context.locals.swr ?? 5;

  const isDev = import.meta.env.DEV;

  if (isDev) return await next();

  const timer = new Timer();

  if (!context.locals.runtime?.env || !swr) return await next();
  const { KV_SWR } = context.locals.runtime.env;

  timer.time("KV_GET");
  const cached = await KV_SWR.get<{ response: string; expires: number }>(
    context.url.pathname,
    { type: "json" }
  );
  timer.timeEnd("KV_GET");

  if (!cached) {
    timer.time("KV_PUT");
    await put(next, context, KV_SWR, swr);
    timer.timeEnd("KV_PUT");

    const res = await next();

    setServerTimingMetrics(res, timer);

    return res;
  }

  const cachedRes = new Response(new TextEncoder().encode(cached.response));

  if (cached && cached.expires > Date.now()) {
    setServerTimingMetrics(cachedRes, timer);
    return cachedRes;
  }

  timer.time("KV_PUT");
  await put(next, context, KV_SWR, swr);
  timer.timeEnd("KV_PUT");

  setServerTimingMetrics(cachedRes, timer);
  return cachedRes;
});

async function put(
  next: MiddlewareNext,
  context: APIContext<Record<string, any>>,
  kv: KVNamespace,
  swr: number
) {
  const res = await next();
  const buffer = await res.arrayBuffer();
  const body = new TextDecoder("utf-8").decode(buffer ?? undefined);

  await kv.put(
    context.url.pathname,
    JSON.stringify({
      response: body,
      expires: Date.now() + swr * 1000,
    })
  );
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
