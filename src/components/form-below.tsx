import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { GitHubButton } from "./github-button";
import { GoogleButton } from "./google-button";

interface FormBelowProps {
  forgetPassword?: boolean;
}

const FormBelow: FC<FormBelowProps> = ({ forgetPassword }) => {
  return (
    <div>
      {forgetPassword ? (
        <div className="form_below">
          <Link
            className="text-blue-500 hover:underline w-full"
            href="/forget-password"
          >
            Forgot your password?
          </Link>
          <Link href="/signup">
            <Button className="w-full" variant="outline">
              Sign Up
            </Button>
          </Link>
        </div>
      ) : null}

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="form_below_continue">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="form_below_continue_social">
        <GitHubButton />
        <GoogleButton />
      </div>
    </div>
  );
};

export default FormBelow;
