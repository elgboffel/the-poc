import { staleWhileRevalidateCache } from "@project/cloudflare";
import { defineMiddleware } from "astro:middleware";

export const staleWhileRevalidateCacheMiddleware = defineMiddleware(
  async (context, next) => {
    if (!context.locals.runtime?.env) return next();

    return await staleWhileRevalidateCache(
      context.locals.runtime.env.KV_SWR as any,
      context.url.pathname,
      next,
      context.locals.runtime.ctx
    );
  }
);
