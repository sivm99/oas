import { handleAuth } from "@/app/(client)/(forms)/actions";
import { createRequest } from "@/Helper/request";
import {
  createRedirectResponse,
  handleAuthError,
  setAuthCookie,
} from "@/utils/authcb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const result = await handleAuth(formData);

    if (!result || !result.user || !result.cookie) {
      return createRedirectResponse(req, {
        success: false,
        message: result?.message || "Authentication failed",
        provider: "Login",
      });
    }

    await setAuthCookie({ name: "token", value: result.cookie });

    return createRedirectResponse(req, {
      success: true,
      message: "login successful",
      provider: "Login",
    });
  } catch (error) {
    return handleAuthError(req, error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return createRedirectResponse(req, {
        success: false,
        message: "Authentication failed",
        provider: "Social Login",
      });
    }

    const result = await createRequest("GET", "/user", {}, token);

    if (!result || result.error || !result.cookies) {
      return createRedirectResponse(req, {
        success: false,
        message: "Authentication failed",
        provider: "Social Login",
      });
    }

    await setAuthCookie({ name: "token", value: result.cookies });

    return createRedirectResponse(req, {
      success: true,
      message: "login successful",
      provider: "Social Login",
    });
  } catch (error) {
    return handleAuthError(req, error, "Social Login");
  }
}
