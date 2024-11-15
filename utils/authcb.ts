import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const HOST = process.env.HOST || "http://localhost:3000";

interface RedirectParams {
  success: boolean;
  message: string;
  provider: string;
  path?: string;
}

interface CookieParams {
  name: string;
  value: string;
}

// Helper function to create redirect response with parameters
export function createRedirectResponse(
  req: NextRequest,
  params: RedirectParams,
): NextResponse {
  const redirectUrl = new URL(`${HOST}/${params.path || "auth"}`, req.url);
  redirectUrl.searchParams.set("success", params.success.toString());
  redirectUrl.searchParams.set("message", params.message);
  redirectUrl.searchParams.set("provider", params.provider);
  return NextResponse.redirect(redirectUrl);
}

// Helper function to set authentication cookie
export async function setAuthCookie(cookieParams: CookieParams) {
  const cookieStore = await cookies();
  cookieStore.set(cookieParams.name, cookieParams.value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3600, // 1 hour
  });
}

// Helper function to handle authentication errors
export function handleAuthError(
  req: NextRequest,
  error: unknown,
  provider: string = "Login",
): NextResponse {
  console.error(`Error in ${req.method} handler:`, error);
  return createRedirectResponse(req, {
    success: false,
    message: "Internal Server Error",
    provider,
    path: "login",
  });
}
