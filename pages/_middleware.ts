import { getToken } from "next-auth/jwt";
import {  NextResponse } from "next/server";
import type {NextRequest} from 'next/server'
import { any } from "prop-types";

export async function middleware(req:NextRequest){
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET! } as any);
  const { pathname } = req.nextUrl;

  //   Allow requests if the following is true...

  // 1) A token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //   2) Its a request for next-auth session & provider fetching
  //   Redirect them to login if they dont have token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    const url = req.nextUrl.clone()
    url.pathname="/login"
    return NextResponse.redirect(url);
  }
}
