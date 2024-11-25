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
import Link from "next/link";

import { User } from "lucide-react";
import { signupAction } from "../actions";
export default async function SignupForm() {
  return (
    <Card className="form_card_container">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create a new One Alias Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="form_container" action={signupAction}>
          <FormInput
            name="name"
            title="Only Alphabets Allowed"
            type="text"
            label="Full Name"
            error="Only Alphabets Allowed"
            required
            pattern="^[a-zA-Z\s]*$"
            placeholder="Your Name"
            icon={User}
            maxLength={64}
          />
          <FormInput
            name="username"
            title="Starts with Alphbet, can have Alphanumerics,dots,underscores and hyphens"
            error="Starts with Alphbet, can have Alphanumerics,dots,underscores and hyphens"
            type="text"
            label="Username"
            required
            pattern="^[a-zA-Z][a-zA-Z0-9\._\-]*$"
            placeholder="you"
            icon={User}
            minLength={4}
            maxLength={15}
          />
          <FormInput
            name="email"
            type="email"
            error="Valid Email Only"
            label="Email Address"
            required
            pattern="^[a-zA-Z0-9][a-zA-Z0-9_\.\-]{0,40}@[a-zA-Z0-9\.\-]{1,18}\.[a-zA-Z]{2,6}$"
            placeholder="your@email.com"
            maxLength={64}
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            required
            autoComplete="new-password"
            placeholder="Create a password"
            minLength={8}
            maxLength={16}
          />
          <FormInput
            name="passwordConfirm"
            type="password"
            label="Confirm Password"
            required
            autoComplete="new-password"
            placeholder="Confirm your password"
            minLength={8}
            maxLength={16}
          />
          <Button type="submit">Signup</Button>
        </form>

        <div className="mt-4">
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Registerd Already? Sign in
            </Button>
          </Link>
        </div>
        <FormBelow />
      </CardContent>
    </Card>
  );
}
