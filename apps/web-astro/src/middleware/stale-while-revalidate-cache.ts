import { defineMiddleware } from "astro:middleware";
import type {APIContext, MiddlewareNext} from "astro";

export const staleWhileRevalidateCache = defineMiddleware(async (context, next) => {
  const swr = context.locals.swr ?? 5
  console.log({ swr })
  console.log(context.locals.runtime)
  if (!context.locals.runtime?.env || !swr) return await next();

  const { KV_SWR } = context.locals.runtime.env;

  const cached = await KV_SWR.get<{ response: string; expires: number; }>(context.url.pathname, { type: "json" });

  if(!cached){
    await put(next, context, KV_SWR, swr);
    return await next();
  }

  const cachedRes = new Response(cached.response);

  if (cached && cached.expires > Date.now()) {
    return cachedRes;
  }

  await put(next, context, KV_SWR, swr);

  return cachedRes;
});

async function put(next: MiddlewareNext, context: APIContext<Record<string, any>>, kv: KVNamespace, swr: number) {
  const res = await next();
  const buffer = await res.arrayBuffer();
  const body = new TextDecoder('utf-8').decode(buffer ?? undefined);

  await kv.put(
    context.url.pathname,JSON.stringify({
        response: body,
        expires: Date.now() + swr * 1000,
      }
    ));
}
