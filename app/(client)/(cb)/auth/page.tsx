"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useAppContext from "@/hooks/useAppContext";
import { fetchDestinations, fetchRules, fetchUser } from "@/Helper/getData";
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
import { AlertCircle } from "lucide-react";

type AuthState = {
  isLoading: boolean;
  error: { message: string; provider: string } | null;
};

const LoadingAnimation = () => (
  <main className="dash_wrapper">
    <section className="dash_child">
      <TelegramFlyingAnimation />
    </section>
  </main>
);

function LoginCallbackContent() {
  const searchParams = useSearchParams();
  const { setUser, setRules, setDestinations } = useAppContext();
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    error: null,
  });
  useEffect(() => {
    const handleLogin = async () => {
      console.log("Auth Use Effect is Running");
      // Capture URL parameters before cleaning
      const success = searchParams.get("success");
      const message = searchParams.get("message");
      const provider = searchParams.get("provider");

      // Immediately clean up URL parameters
      window.history.replaceState(null, "", window.location.pathname);

      try {
        // Handle authentication failure
        if (success === "false") {
          setAuthState({
            isLoading: false,
            error: {
              message: message || "Authentication failed",
              provider: provider || "Unknown",
            },
          });
          return;
        }

        // Handle successful authentication
        if (success === "true") {
          const userData = await fetchUser();

          if (!userData.user || userData.error) {
            setAuthState({
              isLoading: false,
              error: {
                message: userData.error || "Authentication failed",
                provider: provider || "Unknown",
              },
            });
            return;
          }

          setUser(userData.user);
          if (userData.user.destinationCount) {
            const d = await fetchDestinations();
            if (!d.error && d.destinations) {
              setDestinations(d.destinations);
            }
          }
          if (userData.user.aliasCount) {
            const r = await fetchRules();
            if (!r.error && r.rules) {
              setRules(r.rules);
            }
          }
          window.location.href = `/user/${userData.user.username}`;
          return;
        }

        // Handle invalid or missing success parameter
        setAuthState({
          isLoading: false,
          error: {
            message: "Invalid authentication response",
            provider: "System",
          },
        });
      } catch (error) {
        setAuthState({
          isLoading: false,
          error: {
            message:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
            provider: "System",
          },
        });
      }
    };

    // Only run if we have URL parameters
    if (searchParams.has("success")) {
      handleLogin();
    }
  }, [searchParams, setUser, setRules, setDestinations]);

  // Show error state
  if (authState.error) {
    return (
      <main className="dash_wrapper">
        <section className="dash_child">
          <ErrorCard
            message={authState.error.message}
            provider={authState.error.provider}
          />
        </section>
      </main>
    );
  }

  // Show loading state
  return <LoadingAnimation />;
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
      {/* Large Error Icon */}
      <div className="flex justify-center ">
        <AlertCircle className="h-24 w-24 text-red-500 md:h-32 md:w-32" />
      </div>

      <CardHeader className="text-center ">
        <CardTitle className="text-2xl sm:text-7xl font-bold text-red-500">
          {provider} Error
        </CardTitle>
        <CardDescription className="text-xl md:text-5xl mt-2 text-start">
          {message}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          <Button
            variant="default"
            className="w-full sm:w-auto min-w-[140px]"
            asChild
          >
            <Link href={provider === "Signup" ? "/signup" : "/login"}>
              Try Again
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto min-w-[140px] border-2 border-transparent animate-border-glow"
            asChild
          >
            <Link href={provider === "Signup" ? "/login" : "/signup"}>
              {provider === "Signup" ? "Log In Instead" : "Sign Up Instead"}
            </Link>
          </Button>

          <Link
            href="/forget-password"
            className="text-muted-foreground hover:text-primary transition-colors text-sm underline-offset-4 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginCallback() {
  return (
    <Suspense fallback={<TelegramFlyingAnimation />}>
      <LoginCallbackContent />
    </Suspense>
  );
}
