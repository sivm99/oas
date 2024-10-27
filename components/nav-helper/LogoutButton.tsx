"use client";

import { eraseCookie } from "@/hooks/useSetCookie";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <Button
      type="submit"
      variant="destructive"
      className="w-full"
      onClick={() => {
        localStorage.clear();
        eraseCookie("token");
        window.location.href = "/";
      }}
    >
      Logout
    </Button>
  );
}
