export type ParseCacheControlHeader = {
  maxAge: number | null;
  staleWhileRevalidate: number | null;
};

export function parseCacheControlHeader(headerValue: string): ParseCacheControlHeader {
  let maxAge = null;
  let staleWhileRevalidate = null;

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
