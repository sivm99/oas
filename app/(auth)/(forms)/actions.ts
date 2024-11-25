"use server";

import { setAuthCookie } from "@/utils/authcb";
import { emailSchema } from "@/Helper/schema";
import { rd } from "@/utils/redirect";
import { createRequest } from "@/Helper/request";

import { loginSchema, registrationSchema } from "@/Helper/schema";
import { isUserResponse } from "@/Helper/typeFunction";
import { User } from "@/Helper/types";
import { log } from "console";

// Define the state and response types
export type FormState = {
  message?: string;
  success?: boolean;
  user?: User;
  cookie?: string;
};

async function handleAuth(
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
    const authResult = await createRequest(
      "POST",
      endpoint,
      {},
      "",
      formValues.data,
    );

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

    // await createSession(token || " ");

    return {
      success: true,
      message: response.message || `${isNew ? "Signup" : "Login"} successful`,
      user: response.data,
      cookie: authResult.cookies || "",
    };
  } catch (error) {
    log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

async function loginAction(f: FormData) {
  const r = await handleAuth(f);
  if (!r || !r.user || !r.cookie) {
    rd({
      path: "auth",
      success: false,
      message: r.message || "Unknow Error",
      provider: "Login",
    });
    return;
  }
  await setAuthCookie({
    name: "token",
    value: r.cookie,
    username: r.user.username,
  });
  rd({
    path: "auth",
    success: true,
    message: "Login Successful",
    provider: "Login",
  });
}

async function signupAction(f: FormData) {
  const r = await handleAuth(f, true);
  if (!r || !r.user || !r.cookie) {
    rd({
      path: "auth",
      success: false,
      message: r.message || "Unknow Error",
      provider: "Signup",
    });
    return;
  }
  await setAuthCookie({
    name: "token",
    value: r.cookie,
    username: r.user.username,
  });
  rd({
    path: "auth",
    success: true,
    message: "Signup Successful",
    provider: "Signup",
  });
}

async function forgetPasswordAction(f: FormData) {
  const formValue = emailSchema.safeParse(f.get("email"));
  if (!formValue.success)
    rd({
      path: "fp/cb",
      success: false,
      message: "Email Couldn't Be Processed",
      provider: "Forget Password",
    });
  // try {
  const r = await createRequest("POST", "/auth/forget-password", {}, "", {
    email: formValue.data,
  });

  if (r.error || r.status !== 200) {
    rd({
      path: "fp/cb",
      success: false,
      message: r.error || "Unknow Eror",
      provider: "Forget Password",
    });
  }

  rd({
    path: "fp/cb",
    success: true,
    message: r.data?.message || "Password Reset Email Sent",
    provider: "Forget Password",
  });
}

async function resetPasswordAction(f: FormData) {
  const formObject: { [key: string]: string } = {};
  f.forEach((value, key) => {
    formObject[key] = value.toString();
  });
  if (
    !formObject.token ||
    !formObject.password ||
    !formObject.passwordConfirm
  ) {
    rd({
      path: "fp/cb",
      success: false,
      message: "Missing required fields Try Again",
      provider: "Reset Password",
    });
  }
  if (formObject.password !== formObject.passwordConfirm) {
    rd({
      path: "fp/cb",
      success: false,
      message: "Passwords Do Not Match",
      provider: "Reset Password",
      rt: formObject.token,
    });
  }
  const validatedData = {
    token: formObject.token,
    password: formObject.password,
    passwordConfirm: formObject.passwordConfirm,
  };
  const r = await createRequest(
    "POST",
    "/auth/reset-password/:token",
    { token: validatedData.token },
    "",
    validatedData,
  );
  if (r.error || r.status !== 200) {
    rd({
      path: "fp/cb",
      success: false,
      message: r.error || "Unknown Error",
      provider: "Reset Password",
      rt: formObject.token,
    });
  }
  rd({
    path: "fp/cb",
    success: true,
    message: "New Password Was set, Login Now",
    provider: "Reset Password",
  });
}

export { loginAction, signupAction, forgetPasswordAction, resetPasswordAction };
