"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAppContext from "@/hooks/useAppContext";
import { fetchUser } from "@/Helper/getData";
import { Loader2 } from "lucide-react";

export default function LoginCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken, setUser, setError } = useAppContext();
  const [error, setStateError] = useState("");

  useEffect(() => {
    const handleLogin = async () => {
      console.log("Starting login process...");
      const token = searchParams.get("token");
      console.log("Token from searchParams:", token);

      if (token) {
        console.log("Setting token...");
        setToken(token);
      }

      if (!token) {
        console.log("No token found, redirecting to login...");
        setStateError("Login Was unsuccessfull");
        setError("Login Was unsuccessfull");
        router.push("/login");
        return;
      }

      console.log("Fetching user data...");
      const u = await fetchUser(token);
      console.log("Fetch user response:", u);

      if (u.error || !u.user) {
        console.log("Error in user data:", u.error);
        setStateError(u.error || "Login was unsuccessfull");
        setError(u.error || "Login was unsuccessfull");
        router.push("/login");
        return;
      }

      console.log("Login successful, setting user data...");
      setUser(u.user);
      console.log("Redirecting to dashboard...");
      router.push("/user/dash");
    };

    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    console.log("Rendering error state:", error);
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
