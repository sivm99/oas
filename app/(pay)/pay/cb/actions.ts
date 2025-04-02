// so here we will do the verification of the payment as well as we will send the cookie in the front end
"use server";

import { fetchUser } from "@/Helper/getData";
import createRequest from "@/Helper/request";
import { PremiumTypes } from "@/Helper/types";
// import { setAuthCookie } from "@/utils/authcb";
import { rd } from "@/utils/redirect";

export default async function paymentCheckAndSubscribe(
  txnId: string,
  plan: PremiumTypes["plan"],
) {
  const userData = await fetchUser();
  if (!userData.newToken) return;
  const subscribeRequest = await createRequest({
    method: "POST",
    endpoint: "/premium/subscribe",
    token: userData.newToken,
    data: {
      plan,
      txnId,
    },
  });
  console.log(subscribeRequest);
  if (
    !subscribeRequest ||
    !subscribeRequest.data ||
    !subscribeRequest.data.data
  ) {
    return { success: false };
  }
  // const subData = subscribeRequest.data.data as Subscription;
  // await setAuthCookie({
  //   name: "token",
  //   value: userData.newToken,
  //   username: userData.user?.username,
  //   plan: subData.plan,
  // });
  return rd({
    path: "auth",
    success: true,
    message: "Login Successful",
    provider: "Login",
  });
}
