import { sequence } from "astro:middleware";
import { timeToLiveCache } from "./time-to-live-cache.ts";
import {staleWhileRevalidateCache} from "./stale-while-revalidate-cache.ts";

export const onRequest = sequence(staleWhileRevalidateCache);
