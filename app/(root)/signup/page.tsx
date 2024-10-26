import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import AnimatedHero from "@/components/AnimatedHero";
import FormInput from "@/components/FormInput";
import { User } from "lucide-react";
import FormBelow from "@/components/FormBelow";
import Link from "next/link";

async function handleSignup(formData: FormData) {
  "use server";
  // Add your server-side signup logic here
  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  // Handle signup logic
  console.log(name, username, email, password, passwordConfirm);
}

export default function Signup() {
  return (
    <main className="form_wrapper">
      <div className="opacity-100">
        <AnimatedHero gr="Create One Alias Account" />
      </div>
      <Separator className="w-1/2" />
      <div className="opacity-100">
        <Card className="form_card_container">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Create a new One Alias Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="form_container" action={handleSignup}>
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
              <Button type="submit">Sign up</Button>
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
      </div>
    </main>
  );
}
