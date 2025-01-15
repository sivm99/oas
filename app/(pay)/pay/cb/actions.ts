import { PaymentHandler } from "@/utils/payment";
import crypto from "crypto";
// verify the payment and then call my backend using this function
function getOASHash(subscriptionId: string, mobile: string, gateway: string) {
  const salt = process.env.OAS_SALT;
  const verifyStr = `${subscriptionId}-${mobile}-${gateway}`;
  const hash = crypto
    .createHash("sha256")
    .update(verifyStr + salt)
    .digest("hex");
  return hash;
}

/*

function verifyOASSignature(subscriptionId, mobile, gateway, oasVerify) {
    const expectedHash = getOASHash(subscriptionId, mobile, gateway);
    return oasVerify.toLowerCase() === expectedHash.toLowerCase();
}

*/

async function verifyPayment(
  txnid: string,
  success: boolean,
  subid?: string,
): Promise<{ verified: boolean; error?: string }> {
  try {
    // Get payment record from database
    const payment = await PaymentHandler.getPaymentByTxnId(txnid);

    if (!payment) {
      console.error(`No payment record found for txnid: ${txnid}`);
      return { verified: false, error: "Payment record not found" };
    }

    // Update payment status based on callback
    const status = success ? "success" : "failed";
    const remarks = success
      ? `Payment successful${subid ? ` - Subscription ID: ${subid}` : ""}`
      : "Payment failed";

    await PaymentHandler.updatePaymentStatus(txnid, status, remarks);

    // Log verification details
    console.log({
      message: "Payment verification complete",
      txnid,
      success,
      subid,
      originalPayment: payment,
      newStatus: status,
    });

    return { verified: true };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { verified: false, error: "Payment verification failed" };
  }
}

export { getOASHash, verifyPayment };
