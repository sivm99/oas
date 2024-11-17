import { cookies } from "next/headers";

export type LoginState = {
  lastUsername?: string;
  status: "logged-in" | "expired" | "logged-out";
};

export async function getLoginState(): Promise<LoginState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const lastUsername = cookieStore.get("lastUsername");

  if (token && lastUsername) {
    return {
      lastUsername: lastUsername.value,
      status: "logged-in",
    };
  }

  if (lastUsername) {
    return {
      lastUsername: lastUsername.value,
      status: "expired",
    };
  }

  return {
    status: "logged-out",
  };
}
