import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { staleWhileRevalidateCache } from "@project/cloudflare";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<Response> {
  const { env, ctx } = getRequestContext();

  const cachedResponse = await staleWhileRevalidateCache(
    env.KV_WEB_NEXT as any,
    request.nextUrl.pathname,
    NextResponse.next,
    ctx
  );

  if (cachedResponse) return cachedResponse;

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
