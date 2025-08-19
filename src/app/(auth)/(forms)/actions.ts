"use server";

import { setSomeCookie } from "@/helper/cookie-helper";
import createRequest from "@/helper/request";
import { emailSchema, loginSchema, registrationSchema } from "@/helper/schema";
import { isUserResponse } from "@/helper/type-functons";
import { rd } from "@/lib/redirect";
import type { User } from "@/types";

// Define the state and response types
export type FormState = {
  message?: string;
  success?: boolean;
  user?: User;
  cookie?: string;
};

async function handleAuth(
  formData: FormData,
  isNew = false,
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
    const authResult = await createRequest({
      method: "POST",
      endpoint,
      data: formValues.data,
    });

    if (authResult.error || !authResult.data) {
      console.log(authResult.error || "Unknown error occurred");
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
      console.log(response.message || `${isNew ? "Signup" : "Login"} failed`);
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
    console.error(error, "the error is")
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
  await setSomeCookie("token", r.cookie);
  await setSomeCookie("lastUsername", r.user.username);
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
  await setSomeCookie("token", r.cookie);
  await setSomeCookie("lastUsername", r.user.username);
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
  const r = await createRequest({
    method: "POST",
    endpoint: "/auth/forget-password",
    data: {
      email: formValue.data,
    },
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
  const r = await createRequest({
    method: "POST",
    endpoint: "/auth/reset-password/:token",
    params: { token: validatedData.token },
    data: validatedData,
  });
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
