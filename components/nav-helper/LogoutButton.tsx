"use client";
import { db } from "@/Helper/dbService";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LogoutButton() {
  const [name, setName] = useState("");
  useEffect(() => {
    const checkLoginStatus = async () => {
      const lastUsername = localStorage.getItem("lastUsername");
      if (!lastUsername) return;
      setName(lastUsername);
      return;
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    db.clearAll();
    window.location.href = "/";
  };

  return (
    <>
      {name.length > 0 ? (
        <>
          <Link href={`/user/${name}`}>
            <Button
              variant="secondary"
              className="border-2 border-transparent animate-border-glow w-full md:w-auto"
            >
              Dashboard
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="submit"
                variant="destructive"
                // className="w-full md:w-auto"
              >
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-w-[90vw] mx-auto">
              <DialogHeader>
                <DialogTitle>Are you sure you want to logout?</DialogTitle>
                <DialogDescription>
                  You will need to login again to access your dashboard.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Button
            type="submit"
            className="md:w-fit w-full border-2 border-transparent animate-border-glow"
            variant="secondary"
          >
            <Link href="/signup" className="w-full">
              Register
            </Link>
          </Button>
          <Button
            type="submit"
            className="md:w-fit w-full border-2 border-transparent animate-border-glow"
            variant="secondary"
          >
            <Link href="/login" className="w-full">
              Login
            </Link>
          </Button>
        </>
      )}
    </>
  );
}
