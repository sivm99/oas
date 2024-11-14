import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  return new Response(`Email: ${email}, Password: ${password}`);
}
