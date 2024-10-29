"use server";
// import { createSession } from "@/app/auth/session";
import { createRequest } from "@/Helper/request";
import { loginSchema, registrationSchema } from "@/Helper/schema";
import { isUserResponse } from "@/Helper/typeFunction";
import { User } from "@/Helper/types";
import { getCookieFromString } from "@/hooks/useSetCookie";
import { log } from "console";

// Define the state and response types
export type FormState = {
  message?: string;
  success?: boolean;
  user?: User;
  cookie?: string;
};

export async function handleAuth(
  formData: FormData,
  isNew: boolean = false,
): Promise<FormState> {
  // Validate form data using appropriate schema
  const formValues = await (isNew
    ? registrationSchema.safeParseAsync({
        name: formData.get("name"),
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
      })
    : loginSchema.safeParseAsync({
        email: formData.get("email"),
        password: formData.get("password"),
      }));

  if (!formValues.success) {
    return {
      message: formValues.error.errors.map((err) => err.message).join(", "),
      success: false,
    };
  }

  try {
    const endpoint = isNew ? "/auth/signup" : "/auth/login";
    const authResult = await createRequest("POST", endpoint, formValues.data);

    if (authResult.error || !authResult.data) {
      log(authResult.error || "Unknown error occurred");
      return {
        success: false,
        message: authResult.error || "Unknown error occurred",
      };
    }

    const response = authResult.data;

    // Validate response format
    if (!isUserResponse(response)) {
      return {
        success: false,
        message: "Invalid response format",
      };
    }

    // Check authentication status
    if (response.status !== "success") {
      log(response.message || `${isNew ? "Signup" : "Login"} failed`);
      return {
        success: false,
        message: response.message || `${isNew ? "Signup" : "Login"} failed`,
      };
    }

    // Return successful response
    if (!authResult.cookies) {
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
    const token = getCookieFromString(authResult.cookies, "token");

    // await createSession(token || " ");

    return {
      success: true,
      message: response.message || `${isNew ? "Signup" : "Login"} successful`,
      user: response.data,
      cookie: token || "",
    };
  } catch (error) {
    log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
