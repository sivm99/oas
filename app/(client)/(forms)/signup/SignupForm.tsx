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
import { User } from "lucide-react";
import Link from "next/link";
import useAppContext from "@/hooks/useAppContext";
import { FormState, handleAuth } from "../actions";
import { useActionState } from "react";
import { getCookieFromString, setCookie } from "@/hooks/useSetCookie";
import { redirect } from "next/navigation";

export default function SignupForm() {
  const { setUser, setError } = useAppContext();

  const [r, performSignup, isPending] = useActionState(
    async (prev: FormState | null, formData: FormData): Promise<FormState> => {
      const r = await handleAuth(formData, true);
      if (!r) {
        setError("something went wrong");
        return {
          message: "something went wrong",
          success: false,
        };
      }

      if (!r.cookie || !r.user) {
        setError(r.message || `something went wrong`);
        return {
          message: "missing cookie or user data",
          success: false,
        };
      }

      const token = getCookieFromString(r.cookie, "token");
      if (!token) {
        setError("missing token in cookie");
        return {
          message: "missing token in cookie",
          success: false,
        };
      }

      setCookie("token", token);
      localStorage.setItem(`name`, r.user.name);
      setUser(r.user);
      redirect(`/user/${r.user.username}`);
      return r;
    },
    null,
  );

  return (
    <Card className="form_card_container">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create a new One Alias Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="form_container" action={performSignup}>
          <FormInput
            name="name"
            type="text"
            label="Full Name"
            required
            placeholder="Your Name"
            icon={User}
            maxLength={64}
          />
          <FormInput
            name="username"
            type="text"
            label="Username"
            required
            placeholder="you"
            icon={User}
            minLength={4}
            maxLength={32}
          />
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
            placeholder="Create a password"
            minLength={8}
            maxLength={16}
          />
          <FormInput
            name="passwordConfirm"
            type="password"
            label="Confirm Password"
            required
            placeholder="Confirm your password"
            minLength={8}
            maxLength={16}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "🚀🚀...🚀" : "Signup"}
          </Button>
        </form>

        <div className="mt-4">
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Registerd Already? Sign in
            </Button>
          </Link>
        </div>
        {r?.message}
        <FormBelow />
      </CardContent>
    </Card>
  );
}
