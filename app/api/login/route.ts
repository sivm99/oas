import { handleAuth } from "@/app/(client)/(forms)/actions";
import { createRequest } from "@/Helper/request";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const result = await handleAuth(formData);
    const c = await cookies();

    if (!result || !result.user || !result.cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    c.set("token", result.cookie, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });

    return NextResponse.redirect(new URL("/login/cb?token=lol", req.url));
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
// for outh2
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const u = await createRequest("GET", "/user", {}, token);
  if (!u || u.error || !u.cookies) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const c = await cookies();
  c.set("token", u.cookies, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3600, // 1 hour
  });

  return NextResponse.redirect(new URL("/login/cb?token=lol", req.url));
}
