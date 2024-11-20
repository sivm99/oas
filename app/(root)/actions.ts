"use server";

import { handleAuth } from "../(client)/(forms)/actions";
import { setAuthCookie } from "@/utils/authcb";
import { emailSchema } from "@/Helper/schema";
import { rd } from "@/utils/redirect";
import { createRequest } from "@/Helper/request";

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
