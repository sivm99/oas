"use client";

import { db } from "@/Helper/dbService";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <Button
      type="submit"
      variant="destructive"
      className="w-full"
      onClick={() => {
        localStorage.clear();
        db.clearAll();
        window.location.href = "/";
      }}
    >
      Logout
    </Button>
  );
}
