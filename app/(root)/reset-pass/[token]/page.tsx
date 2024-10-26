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

async function handlePasswordReset(formData: FormData, token: string) {
  "use server";
  // Get token from URL
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  // Handle password reset with token
  console.log({ token, password, passwordConfirm });
}

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  return (
    <main className="form_wrapper">
      <FormHero
        heading="Reset your password?"
        para="Please enter your new password below."
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
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>One Alias Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="form_container"
              action={async (formData) => {
                "use server";

                await handlePasswordReset(formData, token);
              }}
            >
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
              <Button type="submit">Reset Password</Button>
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