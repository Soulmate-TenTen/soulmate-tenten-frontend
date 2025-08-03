import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    }
  }
);

/* 인증이 필요한 페이지 지정 */
export const config = {
  matcher: [
    "/",
    "/chat/:path*"
  ],
}; 