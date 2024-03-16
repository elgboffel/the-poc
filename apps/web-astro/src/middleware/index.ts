import { sequence } from "astro/middleware";
import { staleWhileRevalidateCache } from "./stale-while-revalidate-cache";

export const onRequest = sequence(staleWhileRevalidateCache);
