"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import FormBelow from "@/components/FormBelow";
import { useActionState } from "react";
import useAppContext from "@/hooks/useAppContext";
// import { redirect } from "next/navigation";
import { FormState, handleAuth } from "../actions";

export default function LoginForm() {
  const { setUser, setError, setToken } = useAppContext();

  const [r, performLogin, isPending] = useActionState(
    async (prev: FormState | null, formData: FormData): Promise<FormState> => {
      const r = await handleAuth(formData);
      if (!r) {
        setError("something went wrong");
        return {
          message: "something went wrong",
          success: false,
        };
      }

      if (!r.user) {
        setError(r.message || `something went wrong`);
        return {
          message: "missing  user data",
          success: false,
        };
      }

      localStorage.setItem(`name`, r.user.name);
      setToken(r.cookie || " ");
      setUser(r.user);
      window.location.href = `/user/${r.user.username}`;
      return r;
    },
    null,
  );

  return (
    <Card className="form_card_container">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>One Alias Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="form_container" action={performLogin}>
          <FormInput
            name="email"
            type="email"
            label="Email Address"
            required
            placeholder="your@email.com"
            maxLength={64}
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            minLength={8}
            maxLength={16}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
        {r?.success}
        <FormBelow forgetPassword />
      </CardContent>
    </Card>
  );
}
