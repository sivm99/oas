import Link from "next/link";
import FormHero from "@/components/form-hero";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { forgetPasswordAction } from "../actions";
// import { emailSchema } from "@/Helper/schema";

export default async function ForgetPassword() {
  return (
    <main className="form_wrapper">
      <FormHero
        caption={
          <>
            Remember your password?{" "}
            <Link className="text-primary" href="/login">
              Login
            </Link>
          </>
        }
        heading="Forgot your password?"
        para="Enter your email address below and we'll send you a link to reset your password."
      />
      <Separator className="w-1/2" />
      <div className="opacity-100">
        <Card className="form_card_container">
          <CardHeader>
            <CardTitle>Forgot Your Password !!</CardTitle>
            <CardDescription>One Alias Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={forgetPasswordAction} className="form_container">
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
              <Button type="submit">Send Reset Link</Button>
            </form>
            <br />

            <Link href="/login">
              <Button className="w-full" variant="outline">
                Remember Your Password?
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
