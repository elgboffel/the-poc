import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { env, ctx } = getRequestContext();
  console.log(env);
  // return await staleWhileRevalidateCache(
  //   env.KV_WEB_NEXT as any,
  //   request.nextUrl.pathname,
  //   NextResponse.next as any,
  //   ctx
  // );

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
