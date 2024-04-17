import { sequence } from "astro/middleware";
import { passThroughRoutes } from "./pass-through-routes.ts";
import { staleWhileRevalidateCache } from "./stale-while-revalidate-cache";

// export function onRequest (context, next) {
//   // intercept response data from a request
//   // optionally, transform the response
//   // return a Response directly, or the result of calling `next()`
//   return sequence(passThroughRoutes, staleWhileRevalidateCache);
// };

export const onRequest = sequence(staleWhileRevalidateCache);
