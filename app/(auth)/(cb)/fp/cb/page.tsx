import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type PasswordState = {
  error: {
    message: string;
    provider: string;
    rt?: string;
  } | null;
  success: { message: string; provider: string } | null;
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper = ({ children }: CardWrapperProps) => (
  <main className="dash_wrapper">
    <section className="dash_child">{children}</section>
  </main>
);

const createPasswordState = (
  success: string,
  message: string,
  provider: string,
  rt?: string,
): PasswordState => {
  const isSuccess = success === "true";
  const stateData = { message, provider, rt };

  return {
    success: isSuccess ? stateData : null,
    error: isSuccess ? null : stateData,
  };
};

export default async function PasswordCallback({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    success = "false",
    message = "Unknown Error",
    provider = "server",
    rt = "",
  } = await searchParams;

  const passwordState = createPasswordState(
    success as string,
    message as string,
    provider as string,
    rt as string,
  );

  if (passwordState.success) {
    return (
      <CardWrapper>
        <SuccessCard
          message={passwordState.success.message}
          provider={passwordState.success.provider}
        />
      </CardWrapper>
    );
  }

  if (passwordState.error) {
    return (
      <CardWrapper>
        <ErrorCard
          message={passwordState.error.message}
          provider={passwordState.error.provider}
          tk={rt as string}
        />
      </CardWrapper>
    );
  }
}

function SuccessCard({
  message,
  provider,
}: {
  message: string;
  provider: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex justify-center">
        <CheckCircle2 className="h-24 w-24 text-green-500 md:h-32 md:w-32" />
      </div>

      <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-7xl font-bold text-green-500">
          Success!
        </CardTitle>
        <CardDescription className="text-xl md:text-5xl mt-2 text-start">
          {message}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-center mt-6">
          <Button
            variant="default"
            className="w-full sm:w-auto min-w-[140px]"
            asChild
          >
            <Link href={provider === "Reset Password" ? "/login" : "/"}>
              {provider === "Reset Password" ? "Go to Login" : "Go to Home"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ErrorCard({
  message,
  provider,
  tk,
}: {
  message: string;
  provider: string;
  tk?: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex justify-center">
        <AlertCircle className="h-24 w-24 text-red-500 md:h-32 md:w-32" />
      </div>

      <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-7xl font-bold text-red-500">
          {provider} Error
        </CardTitle>
        <CardDescription className="text-xl md:text-5xl mt-2 text-start">
          {message}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-center mt-6">
          <Link
            href={
              provider === "Reset Password"
                ? `/reset-password/${tk}`
                : "/forget-password"
            }
          >
            <Button
              variant="default"
              className="w-full sm:w-auto min-w-[140px]"
            >
              Try Again
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
