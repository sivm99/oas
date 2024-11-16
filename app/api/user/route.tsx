import fetchData from "@/app/(client)/user/[username]/actions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const c = await cookies();
  const token = c.get("token");

  if (!token || !token.value) {
    return NextResponse.json({ user: null });
  }

  const u = await fetchData("user", token.value);
  if (u.success || !u.data) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: u.data });
}
