import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import FormInput from "@/components/FormInput";
import FormHero from "@/components/FormHero";
import Link from "next/link";

async function handleLogin(formData: FormData) {
  "use server";
  // Add your server-side login logic here
  const email = formData.get("email");

  // Handle authentication
  console.log(email);
}

export default async function ForgetPassword() {
  return (
    <main className="form_wrapper">
      <FormHero
        heading="Forgot your password?"
        para="Enter your email address below and we'll send you a link to reset your password."
        caption={
          <>
            Remember your password?{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </>
        }
      />
      <Separator className="w-1/2" />
      <div className="opacity-100">
        <Card className="form_card_container">
          <CardHeader>
            <CardTitle>Forgot Your Password !!</CardTitle>
            <CardDescription>One Alias Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="form_container" action={handleLogin}>
              <FormInput
                name="email"
                type="email"
                label="Email Address"
                required
                placeholder="your@email.com"
                maxLength={64}
              />
              <Button type="submit">Send Reset Link</Button>
            </form>
            <br />

            <Link href="/login">
              <Button variant="outline" className="w-full">
                Remember Your Password?
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
