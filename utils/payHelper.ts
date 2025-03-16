import createRequest from "@/Helper/request";
import { PremiumTypes } from "@/Helper/types";

export async function rechargeCreditAndSubscribe(
  plan: PremiumTypes["plan"],
  months: PremiumTypes["months"],
  token?: string,
) {
  if (!plan || !token) return null;
  const paymentRequest = await createRequest({
    method: "POST",
    endpoint: "/premium/init",
    token,
    data: {
      plan,
      months,
    },
  });
  if (!paymentRequest || !paymentRequest.data || !paymentRequest.data.data)
    return null;
  const payUrl = paymentRequest.data.data as string;
  return payUrl;
}
