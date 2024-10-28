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
import { redirect } from "next/navigation";
import { FormState, handleAuth } from "../actions";
import { fetchDestinations, fetchRules } from "@/Helper/getData";

export default function LoginForm() {
  const { setUser, setError, setRules, setDestinations } = useAppContext();

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
      localStorage.setItem("token", r.cookie || "");

      if (r.user.aliasCount > 0) {
        const rulesResult = await fetchRules(r.cookie);
        if (!rulesResult.error && rulesResult.rules) {
          setRules(rulesResult.rules);
        }
      }

      if (r.user.destinationCount > 0) {
        const destinationsResult = await fetchDestinations(r.cookie);
        if (!destinationsResult.error && destinationsResult.destinations) {
          setDestinations(destinationsResult.destinations);
        }
      }

      setUser(r.user);
      redirect(`/user/${r.user.username}`);
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
