import crypto from "crypto";
interface PayUConfig {
  merchantKey: string;
  saltKey: string;
  host: string;
  appHost: string;
}

interface PayUHashParams {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  salt: string;
}

interface PayURequestParams extends Record<string, string> {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
}

// Helper function to generate hash
function generatePayUHash(params: PayUHashParams): string {
  try {
    const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||||||||${params.salt}`;
    return crypto.createHash("sha512").update(hashString).digest("hex");
  } catch (error) {
    console.error("Error generating PayU hash:", error);
    throw new Error("Failed to generate payment hash");
  }
}

// Helper function to validate required environment variables
function getPayUConfig(): PayUConfig {
  const merchantKey = process.env.TEST_PAYU_MERCHENT_KEY;
  const saltKey = process.env.TEST_PAYU_SALT_KEY;
  const host = process.env.TEST_PAYU_HOST;
  const appHost = process.env.HOST;

  if (!merchantKey || !saltKey || !host || !appHost) {
    throw new Error("Missing required PayU configuration");
  }

  return {
    merchantKey,
    saltKey,
    host,
    appHost,
  };
}

// Helper function to validate mobile number
function validateMobile(mobile: string): boolean {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
}

// Helper function to build PayU URL
function buildPayUUrl(params: PayURequestParams, apiEndpoint: string): string {
  try {
    const encodedParams = new URLSearchParams(params).toString();
    return `${apiEndpoint}?${encodedParams}`;
  } catch (error) {
    console.error("Error building PayU URL:", error);
    throw new Error("Failed to build payment URL");
  }
}

export { buildPayUUrl, validateMobile, getPayUConfig, generatePayUHash };
export type { PayUConfig, PayUHashParams, PayURequestParams };
