// app/pricing/actions.ts
"use server";

import { fetchUser } from "@/Helper/getData";
import { PremiumTypes } from "@/Helper/types";
import { rechargeCreditAndSubscribe } from "@/utils/payHelper";
import { redirect } from "next/navigation";

export default async function paymentAction(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const userData = await fetchUser();

    if (!userData?.user) {
      return { error: "User must be logged in to proceed" };
    }

    const plan = formData.get("plan") as PremiumTypes["plan"];
    const month = formData.get("month") as string;

    // Validate inputs
    if (!plan || !month) {
      return { error: "All fields are required" };
    }
    const paymentUrl = await rechargeCreditAndSubscribe(
      plan,
      Number(month) as PremiumTypes["months"],
      userData.newToken,
    );
    if (!paymentUrl) return { error: "some error occured" };
    redirect(paymentUrl);
  } catch (error) {
    console.error("Payment action error:", error);
    return { error: "Payment initialization failed. Please try again." };
  }
}
