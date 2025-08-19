import { type NextRequest, NextResponse } from "next/server";
import fetchData from "@/app/(client)/user/[username]/actions";
import { EXPIRE_TIME, HOST, isDev } from "@/env";
import { createRedirectResponse } from "@/lib/redirect";
// import { handleAuthError } from "@/lib/errors"; // make sure this exists

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return createRedirectResponse(req, {
      path: "auth",
      success: false,
      message: "Authentication failed",
      provider: "Social Login",
    });
  }

  const result = await fetchData("user", token);

  if (!result || !result.success || !result.data || !result.newToken) {
    return createRedirectResponse(req, {
      path: "auth",
      success: false,
      message: "Authentication failed",
      provider: "Social Login",
    });
  }

  // create a response that sets cookies + redirects
  const redirectUrl = new URL(`${HOST}/user/${result.data.username}`);

  const res = NextResponse.redirect(redirectUrl);

  res.cookies.set("token", result.newToken, {
    path: "/",
    secure: !isDev,
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 60 * 1000 * EXPIRE_TIME),
    maxAge: 60 * EXPIRE_TIME,
  });

  res.cookies.set("lastUsername", result.data.username, {
    path: "/",
    secure: !isDev,
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 60 * 1000 * EXPIRE_TIME),
    maxAge: 60 * EXPIRE_TIME,
  });

  return res;
}
