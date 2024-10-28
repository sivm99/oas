import "server-only";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { ResponseCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

declare module "next/headers" {
  function cookies(): Promise<ResponseCookies>;
}

const c = await cookies();

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  c.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });

  // redirect("/");
}

export function deleteSession() {
  c.delete("token");
  redirect("/login");
}
