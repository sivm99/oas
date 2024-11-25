// "use client";
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
import { fetchUser } from "@/Helper/getData";
import { redirect } from "next/navigation";

type AuthState = {
  error: { message: string; provider: string } | null;
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LoginCallback({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    success = "false",
    message = "Unknow Error",
    provider = "Server",
  } = await searchParams;

  if ((success as string) === "true") {
    const { user } = await fetchUser();
    if (user) {
      redirect(`/user/${user.username}`);
    }
  }

  const authState: AuthState = {
    error: {
      message: message as string,
      provider: provider as string,
    },
  };

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
