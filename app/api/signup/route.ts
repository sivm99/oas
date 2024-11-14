import { handleAuth } from "@/app/(client)/(forms)/actions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const HOST = process.env.HOST || "http://localhost:3000";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const result = await handleAuth(formData, true);
    const c = await cookies();

    if (!result || !result.user || !result.cookie) {
      return NextResponse.redirect(new URL(`${HOST}/login`, req.url));
    }

    c.set("token", result.cookie, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });

    return NextResponse.redirect(
      new URL(`${HOST}/login/cb?token=prod`, req.url),
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.redirect(new URL(`${HOST}/login`, req.url));
  }
}
