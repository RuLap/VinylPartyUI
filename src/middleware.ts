import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './app/lib/session';

export async function middleware(request: NextRequest) {
  const session = await getSession(request);
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/", "/login", "/register"]
  const privateRoutes = ["/dashboard", "/parties", "/party{id}"]

  const isPublicRoute = publicRoutes.some((path) => pathname.startsWith(path))
  const isPrivateRoute = privateRoutes.some((path) => pathname.startsWith(path))

  if (!session && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  
  return NextResponse.next();
}