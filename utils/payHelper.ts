import crypto from "crypto";
function base64(object: Record<string, unknown>) {
  const buffer = Buffer.from(JSON.stringify(object), "utf-8");
  return buffer.toString("base64");
}

function sha256(content: string) {
  const hash = crypto.createHash("sha256");
  hash.update(content);
  return hash.digest("hex");
}

function payuSha512({
  key,
  txnid,
  amount,
  productinfo,
  firstname,
  email,
  salt,
}: {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  salt: string;
}) {
  const input = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash("sha512").update(input).digest("hex");
}

const generateTransactionId = (prefix = "MT") => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `${prefix}${timestamp}${random}`;
};

const generateSubscriptionId = (username: string) => {
  const timestamp = Date.now();
  return `sub-${username}-${timestamp}`;
};

const generateMerchantUserId = (username: string) => {
  return `muid-${username}-${Date.now()}`;
};

const createPhonePeHeaders = (
  reqBody: string,
  endpoint: string,
  apiKey: string,
) => {
  const verifyString = `${sha256(reqBody + endpoint + apiKey)}###1`;
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Verify": verifyString,
  };
};

const handlePhonePeResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`PhonePe API error: ${JSON.stringify(errorData)}`);
  }
  return response.json();
};

type PaymentConfig = {
  host: string;
  merchantId: string;
  apiKey: string;
  redirectUrl: string;
  callbackUrl: string;
};

const createSubscriptionPayload = (
  config: PaymentConfig,
  username: string,
) => ({
  merchantId: config.merchantId,
  merchantSubscriptionId: generateSubscriptionId(username),
  merchantUserId: generateMerchantUserId(username),
  authWorkflowType: "PENNY_DROP",
  amountType: "FIXED",
  amount: 7900,
  frequency: "MONTHLY",
  recurringCount: 12,
  mobileNumber: "9465321229", // Consider making this dynamic
});

const createPaymentPayload = (config: PaymentConfig, username: string) => ({
  merchantId: config.merchantId,
  merchantTransactionId: generateTransactionId(),
  merchantUserId: generateMerchantUserId(username),
  amount: 10000,
  redirectUrl: config.redirectUrl,
  redirectMode: "REDIRECT",
  callbackUrl: config.callbackUrl,
  paymentInstrument: {
    type: "PAY_PAGE",
  },
});

export {
  base64,
  sha256,
  payuSha512,
  generateTransactionId,
  generateSubscriptionId,
  generateMerchantUserId,
  createPhonePeHeaders,
  handlePhonePeResponse,
  createSubscriptionPayload,
  createPaymentPayload,
};
export type { PaymentConfig };
