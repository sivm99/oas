// UserNavContent.tsx - Client Component
"use client";

import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import SignOutButton from "./SignOutButton";
import { User } from "@/Helper/types";

interface UserNavContentProps {
  user?: User;
  isMobile?: boolean;
}

export function UserNavContent({
  user,
  isMobile = false,
}: UserNavContentProps) {
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4">
        <ModeToggle />
        {user ? (
          <>
            <Link href={`/user/dash`}>
              <Button variant="outline" className="w-full">
                <UserIcon size={20} className="mr-2" />
                Profile
              </Button>
            </Link>
            <SignOutButton />
          </>
        ) : (
          <Link href="/login">
            <Button variant="default" className="w-full">
              Login
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />
      {user ? (
        <>
          <Link href={`/user/dash`}>
            <Button variant="outline">
              <UserIcon size={20} />
            </Button>
          </Link>
          <SignOutButton />
        </>
      ) : (
        <Link href="/login">
          <Button variant="default">Login</Button>
        </Link>
      )}
    </div>
  );
}
