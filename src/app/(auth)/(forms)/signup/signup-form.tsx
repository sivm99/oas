import { User } from "lucide-react";
import Link from "next/link";
import FormBelow from "@/components/form-below";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signupAction } from "../actions";
export default async function SignupForm() {
  return (
    <Card className="form_card_container">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create a new One Alias Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signupAction} className="form_container">
          <FormInput
            error="Only Alphabets Allowed"
            icon={User}
            label="Full Name"
            maxLength={64}
            name="name"
            pattern="^[a-zA-Z\s]*$"
            placeholder="Your Name"
            required
            title="Only Alphabets Allowed"
            type="text"
          />
          <FormInput
            error="Starts with Alphbet, can have Alphanumerics,dots,underscores and hyphens"
            icon={User}
            label="Username"
            maxLength={15}
            minLength={4}
            name="username"
            pattern="^[a-zA-Z][a-zA-Z0-9\._\-]*$"
            placeholder="you"
            required
            title="Starts with Alphbet, can have Alphanumerics,dots,underscores and hyphens"
            type="text"
          />
          <FormInput
            error="Valid Email Only"
            label="Email Address"
            maxLength={64}
            name="email"
            pattern="^[a-zA-Z0-9][a-zA-Z0-9_\.\-]{0,40}@[a-zA-Z0-9\.\-]{1,18}\.[a-zA-Z]{2,6}$"
            placeholder="your@email.com"
            required
            type="email"
          />
          <FormInput
            autoComplete="new-password"
            label="Password"
            maxLength={16}
            minLength={8}
            name="password"
            placeholder="Create a password"
            required
            type="password"
          />
          <FormInput
            autoComplete="new-password"
            label="Confirm Password"
            maxLength={16}
            minLength={8}
            name="passwordConfirm"
            placeholder="Confirm your password"
            required
            type="password"
          />
          <Button type="submit">Signup</Button>
        </form>

        <div className="mt-4">
          <Link href="/login">
            <Button className="w-full" variant="outline">
              Registerd Already? Sign in
            </Button>
          </Link>
        </div>
        <FormBelow />
      </CardContent>
    </Card>
  );
}
