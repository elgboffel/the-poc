type Response = ResponseInit & {
  readonly headers: Headers;
};

/**
 * Sets the Cache-Control header of a response object to enable stale-while-revalidate caching strategy.
 *
 * @param {Response} res - The response object whose header is to be set.
 * @param {number} maxAge - The maximum age for the cache in seconds.
 * @param {number} staleWhileRevalidate - The duration in seconds during which a stale item can be used while a new one is being fetched.
 */
export function setStaleWhileRevalidateHeader(
  res: Response,
  maxAge: number,
  staleWhileRevalidate: number
) {
  res.headers.set(
    "Cache-Control",
    `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  );
}
