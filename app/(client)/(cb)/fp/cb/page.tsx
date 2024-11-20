"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TelegramFlyingAnimation from "@/components/assets/FlyingTelegram";
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
  isLoading: boolean;
  error: { message: string; provider: string } | null;
  success: { message: string; provider: string } | null;
};

const LoadingAnimation = () => (
  <main className="dash_wrapper">
    <section className="dash_child">
      <TelegramFlyingAnimation />
    </section>
  </main>
);

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
}: {
  message: string;
  provider: string;
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
          <Button
            variant="default"
            className="w-full sm:w-auto min-w-[140px]"
            onClick={() =>
              provider === "Reset Password"
                ? window.history.back()
                : (window.location.href = "/forget-password")
            }
          >
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PasswordCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [passwordState, setPasswordState] = useState<PasswordState>({
    isLoading: true,
    error: null,
    success: null,
  });

  useEffect(() => {
    const handleCallback = async () => {
      // Capture URL parameters
      const success = searchParams.get("success");
      const message = searchParams.get("message");
      const provider = searchParams.get("provider");

      // Clean up URL parameters
      window.history.replaceState(null, "", window.location.pathname);

      if (success === "true") {
        setPasswordState({
          isLoading: false,
          error: null,
          success: {
            message: message || "Operation successful",
            provider: provider || "System",
          },
        });
        return;
      }

      if (success === "false") {
        setPasswordState({
          isLoading: false,
          error: {
            message: message || "Operation failed",
            provider: provider || "System",
          },
          success: null,
        });
        return;
      }

      // Handle invalid or missing success parameter
      setPasswordState({
        isLoading: false,
        error: {
          message: "Invalid response",
          provider: "System",
        },
        success: null,
      });
    };

    if (searchParams.has("success")) {
      handleCallback();
    }
  }, [searchParams, router]);

  if (passwordState.isLoading) {
    return <LoadingAnimation />;
  }

  if (passwordState.success) {
    return (
      <main className="dash_wrapper">
        <section className="dash_child">
          <SuccessCard
            message={passwordState.success.message}
            provider={passwordState.success.provider}
          />
        </section>
      </main>
    );
  }

  if (passwordState.error) {
    return (
      <main className="dash_wrapper">
        <section className="dash_child">
          <ErrorCard
            message={passwordState.error.message}
            provider={passwordState.error.provider}
          />
        </section>
      </main>
    );
  }

  return <LoadingAnimation />;
}

export default function PasswordCallback() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <PasswordCallbackContent />
    </Suspense>
  );
}
