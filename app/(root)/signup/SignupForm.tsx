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

// import { redirect } from "next/navigation";
import { User } from "lucide-react";

export default async function SignupForm() {
  return (
    <Card className="form_card_container">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create a new One Alias Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="form_container" action="/api/signup" method="post">
          <FormInput
            name="name"
            type="text"
            label="Full Name"
            required
            pattern="^[^0-9]+$"
            placeholder="Your Name"
            icon={User}
            maxLength={64}
          />
          <FormInput
            name="username"
            title="Min 4 Letters, No Spaces, Can Only Start with Alphabet"
            type="text"
            label="Username"
            required
            pattern="^[a-zA-Z]\S*$"
            placeholder="you"
            icon={User}
            minLength={4}
            maxLength={15}
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
