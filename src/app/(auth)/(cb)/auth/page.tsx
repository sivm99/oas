
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchUser } from "@/helper/get-data";

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

  if (success === "true") {
    const { user } = await fetchUser();
    if (!user && provider === "cb") {
      const u = await fetchUser();
      if (u.error || !u.user) {
        redirect("/login");
      }
      redirect(`/user/${u.user.username}`);
    }
    if (provider === "Social Login" && !user) {
      redirect("/auth?success=true");
    }
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
        <AlertCircle className="h-24 w-24 text-destructive md:h-32 md:w-32" />
      </div>

      <CardHeader className="text-center ">
        <CardTitle className="text-2xl sm:text-7xl font-bold text-destructive ">
          {provider} Error
        </CardTitle>
        <CardDescription className="text-xl md:text-5xl mt-2 text-start">
          {message}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          <Button
            asChild
            className="w-full sm:w-auto min-w-[140px]"
            variant="default"
          >
            <Link href={provider === "Signup" ? "/signup" : "/login"}>
              Try Again
            </Link>
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto min-w-[140px] border-2 border-transparent animate-border-glow"
            variant="outline"
          >
            <Link href={provider === "Signup" ? "/login" : "/signup"}>
              {provider === "Signup" ? "Log In Instead" : "Sign Up Instead"}
            </Link>
          </Button>

          <Link
            className="text-muted-foreground hover:text-primary transition-colors text-sm underline-offset-4 hover:underline"
            href="/forget-password"
          >
            Forgot Password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
