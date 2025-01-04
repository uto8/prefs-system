import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (!request.cookies.has('accessToken')) {
    return NextResponse.rewrite(new URL('/auth/sign_in', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
}
