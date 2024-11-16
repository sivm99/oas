// FILE: app/forget-password/callback/page.tsx
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
import { AlertCircle, CheckCircle } from "lucide-react";

type CallbackState = {
  isLoading: boolean;
  success: boolean;
  message: string;
  provider: string;
  status: number;
};

const LoadingAnimation = () => (
  <main className="dash_wrapper">
    <section className="dash_child">
      <TelegramFlyingAnimation />
    </section>
  </main>
);

function StatusCard({ state }: { state: CallbackState }) {
  const isError = !state.success;

  return (
    <Card className="w-full max-w-lg mx-auto p-6">
      <div className="flex justify-center mb-6">
        {isError ? (
          <AlertCircle className="h-16 w-16 text-red-500" />
        ) : (
          <CheckCircle className="h-16 w-16 text-green-500" />
        )}
      </div>

      <CardHeader className="text-center space-y-2">
        <CardTitle
          className={`text-2xl font-bold ${isError ? "text-red-500" : "text-green-500"}`}
        >
          {isError ? `${state.provider} Error` : "Success"}
        </CardTitle>
        <CardDescription className="text-lg">{state.message}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 mt-6">
          {isError && (
            <Button variant="default" className="w-full" asChild>
              <Link
                href={
                  state.provider === "ResetPassword"
                    ? "/forget-password"
                    : "/login"
                }
              >
                Try Again
              </Link>
            </Button>
          )}

          <Button
            variant={isError ? "outline" : "default"}
            className="w-full"
            asChild
          >
            <Link href={state.success ? "/login" : "/"}>
              {state.success ? "Go to Login" : "Return Home"}
            </Link>
          </Button>

          {isError && (
            <Link
              href="/support"
              className="text-center text-muted-foreground hover:text-primary transition-colors text-sm underline-offset-4 hover:underline"
            >
              Need Help?
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ForgetPasswordCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [callbackState, setCallbackState] = useState<CallbackState>({
    isLoading: true,
    success: false,
    message: "",
    provider: "",
    status: 0,
  });

  useEffect(() => {
    if (searchParams.has("success")) {
      const state = {
        isLoading: false,
        success: searchParams.get("success") === "true",
        message: searchParams.get("message") || "",
        provider: searchParams.get("provider") || "",
        status: parseInt(searchParams.get("status") || "0"),
      };

      setCallbackState(state);

      // Clean URL parameters
      window.history.replaceState({}, "", window.location.pathname);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  if (callbackState.isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <StatusCard state={callbackState} />
    </main>
  );
}

export default function ForgetPasswordCallback() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <ForgetPasswordCallbackContent />
    </Suspense>
  );
}
