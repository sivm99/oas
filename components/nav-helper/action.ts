import { cookies } from "next/headers";

export type LoginState = {
  lastUsername?: string;
  plan?: "free" | "star" | "galaxy";
  status: "logged-in" | "expired" | "logged-out";
};

export async function getLoginState(): Promise<LoginState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const lastUsername = cookieStore.get("lastUsername");
  const plan = cookieStore.get("plan");

  if (token && lastUsername) {
    return {
      lastUsername: lastUsername.value,
      status: "logged-in",
      plan: (plan?.value as "free" | "star" | "galaxy") || "free",
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
