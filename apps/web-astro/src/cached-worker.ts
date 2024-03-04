// cacheWorker.ts
import { parentPort } from "worker_threads";

parentPort?.on("message", async (data) => {
  const { next, context, kv, swr } = data;
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

  parentPort?.postMessage("Done");
});
