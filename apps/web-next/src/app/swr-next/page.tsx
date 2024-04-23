import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

const data = async () => getRequestContext().env.KV_SWR.getWithMetadata("/swr");

export default function Page() {
  return (
    <div className="mt-32 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl dark:text-white">Stale while revalidate</h1>
      <p className="text-muted-foreground mt-4 text-sm">
        {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}
