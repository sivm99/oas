"use server";

import { getLoginState } from "@/components/nav-helper/action";
import { fetchUser } from "@/Helper/getData";
import {
  base64,
  createPaymentPayload,
  createPhonePeHeaders,
  generateTransactionId,
  handlePhonePeResponse,
  PaymentConfig,
} from "@/utils/payHelper";
import { generatePayUHash } from "@/utils/payuHelper";
import { rd } from "@/utils/redirect";
import { ActionState } from "./paymentModelHelper";

export default async function paymentAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const paymentMethod = formData.get("paymentMethod") as string;

    if (paymentMethod === "phonepe") {
      return phonePeAction(formData);
    }

    // For PayU
    const userData = await fetchUser();
    if (!userData?.user) {
      return { error: "User must be logged in to proceed" };
    }

    const mobile = formData.get("mobile") as string;
    const plan = formData.get("plan") as string;
    const amount = formData.get("amount") as string;

    const { name, email } = userData.user;
    const txnid = generateTransactionId("PU");

    // Generate hash and prepare PayU data
    const hash = generatePayUHash({
      key: process.env.TEST_PAYU_MERCHENT_KEY!,
      txnid,
      amount,
      productinfo: plan,
      firstname: name,
      email,
      salt: process.env.TEST_PAYU_SALT_KEY!,
    });

    return {
      payuData: {
        key: process.env.TEST_PAYU_MERCHENT_KEY!,
        txnid,
        amount,
        productinfo: plan,
        firstname: name,
        email,
        phone: mobile,
        surl: `${process.env.HOST}/pay/cb?success=true&message=PaymentSuccessful&txnid=${txnid}&plan=${plan}&mobile=${mobile}&provider=PayU&subid=`,
        furl: `${process.env.HOST}/pay/cb?success=false&message=PaymentFailed&txnid=${txnid}&plan=${plan}&mobile=${mobile}&provider=PayU&subid=`,
        hash,
      },
    };
  } catch (error) {
    console.error("Payment action error:", error);
    return { error: "Payment initialization failed" };
  }
}

async function phonePeAction(formData: FormData) {
  const plan = formData.get("Plan");

  console.log(plan);
  try {
    // Check login state
    const { status, lastUsername } = await getLoginState();
    if (status === "logged-out" || !lastUsername) {
      return rd({
        path: "fp/cb",
        success: false,
        message: "You Need to Login First",
        provider: "Purchase",
      });
    }

    // Configuration
    const config: PaymentConfig = {
      host: process.env.TEST_PHONEPE_HOST!,
      merchantId: process.env.TEST_PHONEPE_MERCHENT_ID!,
      apiKey: process.env.TEST_PHONEPE_API_KEY!,
      redirectUrl: `${process.env.HOST}/fp/cb?success=true&message=payment+of+100+successfull`,
      callbackUrl: `${process.env.HOST}/fp/cb?success=true&message=payment+of+100+successfull`,
    };

    const endpoint = "/pg/v1/pay";

    // Create payment payload
    const paymentPayload = createPaymentPayload(config, lastUsername);
    const encodedPayload = base64(paymentPayload);

    // Create headers
    const headers = createPhonePeHeaders(
      encodedPayload,
      endpoint,
      config.apiKey,
    );

    // Make API request
    console.log(headers);
    console.log(JSON.stringify(encodedPayload));
    const response = await fetch(`${config.host}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        request: encodedPayload,
      }),
    });

    const data = await handlePhonePeResponse(response);
    console.log("PhonePe Response:", data);

    return data;
  } catch (error) {
    console.error("PhonePe payment error:", error);
    throw error; // Or handle the error appropriately based on your needs
  }
}
