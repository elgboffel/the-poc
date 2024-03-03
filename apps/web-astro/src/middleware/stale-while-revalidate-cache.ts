import type { APIContext, MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { Timer } from "../timer.ts";

export const staleWhileRevalidateCache = defineMiddleware(async (context, next) => {
  const swr = context.locals.swr ?? 5;
  const timer = new Timer();

  if (!context.locals.runtime?.env || !swr) return await next();
  const { KV_SWR } = context.locals.runtime.env;

  timer.time("kvg");

  const cached = await KV_SWR.get<{ response: string; expires: number }>(
    context.url.pathname,
    { type: "json" }
  );

  timer.timeEnd("kvg");

  if (!cached) {
    timer.time("kvp");
    await put(next, context, KV_SWR, swr);
    timer.time("kvp");
    const res = await next();
    res.headers.set(
      "Server-Timing",
      Object.entries(timer.allTimes()).reduce(
        (acc, [key, value]) => `${acc}, ${key};dur=${value.value}`,
        ""
      )
    );
    return res;
  }

  const cachedRes = new Response(new TextEncoder().encode(cached.response));

  if (cached && cached.expires > Date.now()) {
    return cachedRes;
  }

  await put(next, context, KV_SWR, swr);

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
