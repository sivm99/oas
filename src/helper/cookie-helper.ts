import { cookies } from "next/headers";
import { EXPIRE_TIME, isDev } from "@/env";

/**set any cookie with the key value only for 1 hour
 * automatically
 */
export async function setSomeCookie(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    path: "/",
    secure: !isDev,
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 60 * 1000 * EXPIRE_TIME),
    maxAge: 60 * EXPIRE_TIME,
  });
}

/**remove any cookie by key */
export async function removeSomeCookie(key: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, "", {
    path: "/",
    secure: !isDev,
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(0),
    maxAge: 0,
  });
}

/**get any cookie by name */
export async function getSomeCookie(key: string): Promise<string | false> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  return cookie ? cookie.value : false;
}

export function getCookieFromString(cookieString: string, name: string) {
  const nameEQ = `${name}=`;
  const ca = cookieString.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
}
