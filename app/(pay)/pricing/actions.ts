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
import {
  buildPayUUrl,
  generatePayUHash,
  getPayUConfig,
  PayUHashParams,
  PayURequestParams,
  validateMobile,
} from "@/utils/payuHelper";
import { rd } from "@/utils/redirect";
import { redirect } from "next/navigation";
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
      return { error: "User authentication failed" };
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

async function payuAction(formData: FormData) {
  try {
    // Fetch user and validate
    const userData = await fetchUser();
    if (!userData?.user) {
      return redirect(
        `/fp/cb?success=false&message=${encodeURIComponent("User authentication failed")}&provider=PayU+Payment`,
      );
    }

    // Get mobile number and validate
    const mobile = formData.get("mobile") as string;
    if (!mobile || !validateMobile(mobile)) {
      return redirect(
        `/fp/cb?success=false&message=${encodeURIComponent("Invalid mobile number")}&provider=PayU+Payment`,
      );
    }

    // Get user details
    const { name, email } = userData.user;
    if (!name || !email) {
      return redirect(
        `/fp/cb?success=false&message=${encodeURIComponent("Invalid user details")}&provider=PayU+Payment`,
      );
    }

    // Get config
    const config = getPayUConfig();

    // Generate transaction ID
    const txnid = generateTransactionId("PU");

    // Prepare hash parameters
    const hashParams: PayUHashParams = {
      key: config.merchantKey,
      txnid,
      amount: "79.00",
      productinfo: "Galaxy Plan",
      firstname: name,
      email,
      salt: config.saltKey,
    };

    // Generate hash
    const hash = generatePayUHash(hashParams);

    // Prepare request parameters
    const requestParams: PayURequestParams = {
      ...hashParams,
      phone: mobile,
      surl: `${config.appHost}/fp/cb?success=true`,
      furl: `${config.appHost}/fp/cb?success=false`,
      hash,
    };

    // Build and return URL
    const paymentUrl = buildPayUUrl(requestParams, config.host);

    // Log for debugging
    console.log("PayU Payment URL:", paymentUrl);

    return redirect(paymentUrl);
  } catch (error) {
    console.error("PayU payment error:", error);
    return redirect(
      `/fp/cb?success=false&message=${encodeURIComponent("Payment initialization failed")}&provider=PayU+Payment`,
    );
  }
}

export { phonePeAction, payuAction };
