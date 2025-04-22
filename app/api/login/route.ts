import fetchData from "@/app/(client)/user/[username]/actions";
import createRequest from "@/Helper/request";
import { User } from "@/Helper/types";
import {
  createRedirectResponse,
  handleAuthError,
  setAuthCookie,
} from "@/utils/authcb";
import { NextRequest, NextResponse } from "next/server";
const HOST = process.env.HOST || "http://localhost:3000";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const result = await handleAuth(formData);

//     if (!result || !result.user || !result.cookie) {
//       return createRedirectResponse(req, {
//         success: false,
//         message: result?.message || "Authentication failed",
//         provider: "Login",
//       });
//     }

//     await setAuthCookie({ name: "token", value: result.cookie });

//     return createRedirectResponse(req, {
//       success: true,
//       message: "login successful",
//       provider: "Login",
//     });
//   } catch (error) {
//     return handleAuthError(req, error);
//   }
// }

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

    const result = await fetchData("user", token);

    if (!result || !result.success || !result.data || !result.newToken) {
      return createRedirectResponse(req, {
        success: false,
        message: "Authentication failed",
        provider: "Social Login",
      });
    }

    // here we want to set the premium plan as well so we will make one more call
    let plan = "free" as User["plan"];
    if (result.data.isPremium) {
      const res = await createRequest({
        endpoint: "/user/plan",
        token: result.newToken,
      });
      if (!res || !res.data || !res.data.data) return;
      const u = res.data.data as User;
      plan = u.plan;
    }
    await setAuthCookie({
      name: "token",
      value: result.newToken,
      username: result.data.username,
      plan,
    });

    const redirectUrl = new URL(`${HOST}/user/${result.data.username}`);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    return handleAuthError(req, error, "Social Login");
  }
}
