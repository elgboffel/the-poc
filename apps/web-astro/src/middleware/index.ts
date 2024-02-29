import { sequence } from "astro:middleware";
import { cache } from "./cache.ts";

export const onRequest = sequence(cache);
