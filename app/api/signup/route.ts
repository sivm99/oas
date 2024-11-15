import { handleAuth } from "@/app/(client)/(forms)/actions";
import {
  createRedirectResponse,
  handleAuthError,
  setAuthCookie,
} from "@/utils/authcb";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const result = await handleAuth(formData, true);

    if (!result || !result.user || !result.cookie) {
      return createRedirectResponse(req, {
        success: false,
        message: result?.message || "Authentication failed",
        provider: "Signup",
      });
    }

    await setAuthCookie({ name: "token", value: result.cookie });

    return createRedirectResponse(req, {
      success: true,
      message: "signup successful",
      provider: "Signup",
    });
  } catch (error) {
    return handleAuthError(req, error, "Signup");
  }
}
