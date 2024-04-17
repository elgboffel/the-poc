import { defineMiddleware } from "astro:middleware";

export const passThroughRoutes = defineMiddleware((context, next) => {
  const url = new URL(context.url);

  if (skipMiddleware(url.pathname)) {
    return next();
  }
});

const PASS_THROUGH_ROUTES = [`/api`];

export function skipMiddleware(urlPathname: string) {
  let shouldSkip = false;

  for (const route of PASS_THROUGH_ROUTES) {
    if (urlPathname.startsWith(route)) {
      shouldSkip = true;
      break;
    }
  }

  return shouldSkip;
}
