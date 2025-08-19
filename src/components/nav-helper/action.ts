import { getSomeCookie } from "@/helper/cookie-helper";

export type LoginState = {
  lastUsername?: string;
  plan?: "free" | "star" | "galaxy";
  status: "logged-in" | "expired" | "logged-out";
};

export async function getLoginState(): Promise<LoginState> {
  const token = await getSomeCookie("token");
  const lastUsername = await getSomeCookie("lastUsername");

  if (token && lastUsername) {
    return {
      lastUsername: lastUsername,
      status: "logged-in",
      plan: "free",
    };
  }

  if (lastUsername) {
    return {
      lastUsername: lastUsername,
      status: "expired",
    };
  }

  return {
    status: "logged-out",
  };
}
