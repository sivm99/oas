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
      const token = searchParams.get("token");

      if (token) {
        setToken(token);
        window.history.replaceState(null, "", window.location.pathname);
      }

      if (!token) {
        setStateError("Login Was unsuccessfull");
        setError("Login Was unsuccessfull");
        router.push("/login");
        return;
      }

      const u = await fetchUser(token);

      if (u.error || !u.user) {
        setStateError(u.error || "Login was unsuccessfull");
        setError(u.error || "Login was unsuccessfull");
        router.push("/login");
        return;
      }

      setUser(u.user);
      router.push("/user/dash");
    };

    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
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
