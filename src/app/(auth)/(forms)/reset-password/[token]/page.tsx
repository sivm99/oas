import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { resetPasswordAction } from "../../actions";
import FormHero from "@/components/form-hero";
import FormInput from "@/components/form-input";

type Params = Promise<{ token: string }>;

export default async function ResetPassword({ params }: { params: Params }) {
  const { token } = await params;
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
        heading="Reset your password?"
        para="Please enter your new password below."
      />
      <Separator className="w-1/2" />
      <div className="opacity-100">
        <Card className="form_card_container">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>One Alias Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={resetPasswordAction} className="form_container">
              <input hidden id="token" name="token" readOnly value={token} />
              <FormInput
                label="Password"
                maxLength={16}
                minLength={8}
                name="password"
                placeholder="New  password"
                required
                type="password"
              />
              <FormInput
                label="Confirm Password"
                maxLength={16}
                minLength={8}
                name="passwordConfirm"
                placeholder="Confirm your password"
                required
                type="password"
              />
              <Button type="submit">Reset Password</Button>
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
