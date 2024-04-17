export type ParseSWRCacheControlHeader = {
  maxAge: number | null;
  staleWhileRevalidate: number | null;
};

export function parseSWRCacheControlHeader(
  headerValue: string
): ParseSWRCacheControlHeader {
  let maxAge: number | null = null;
  let staleWhileRevalidate: number | null = null;

  const directives = headerValue.split(", ");

  for (const directive of directives) {
    if (directive.startsWith("max-age")) {
      maxAge = parseInt(directive.split("=")[1]);
    } else if (directive.startsWith("stale-while-revalidate")) {
      staleWhileRevalidate = parseInt(directive.split("=")[1]);
    }
  }

  return { maxAge, staleWhileRevalidate };
}
