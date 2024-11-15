"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  // SheetClose,
  SheetFooter,
  SheetDescription,
} from "../ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/Helper/dbService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserNavContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const lastUsername = localStorage.getItem("lastUsername");
      if (!lastUsername) return;
      setName(lastUsername);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    setIsOpen(false); // Close the sheet
    localStorage.clear();
    db.clearAll();
    window.location.href = "/";
  };

  const handleSheetClose = () => {
    setIsOpen(false);
  };

  const LogoutButtonContent = ({ onClose }: { onClose: () => void }) => (
    <>
      {name.length > 0 ? (
        <>
          <Link href={`/user/${name}`} onClick={onClose}>
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
                className="w-full md:w-auto"
              >
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[425px] max-w-[90vw] mx-auto"
              aria-label="Lougout Warning"
              aria-describedby={undefined}
            >
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
        <Button type="submit" className="md:w-fit w-full">
          <Link href="/login" className="w-full" onClick={onClose}>
            Login
          </Link>
        </Button>
      )}
    </>
  );

  return (
    <>
      <div className="hidden md:flex items-center space-x-2">
        <ModeToggle />
        <LogoutButtonContent onClose={() => {}} />
      </div>
      <div className="md:hidden">
        <ModeToggle />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger aria-label="Toggle menu" asChild>
            <Button variant="ghost">
              <Menu size={20} aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="sm:w-2/3 md:w-1/2 lg:w-1/3"
            role="dialog"
            aria-label="Menu"
          >
            <SheetHeader>
              <SheetTitle>One Alias Service</SheetTitle>
              <SheetDescription>Hello Dear {name} </SheetDescription>
            </SheetHeader>
            <nav className="">
              <SheetFooter className="mt-4 flex flex-col gap-4">
                <LogoutButtonContent onClose={handleSheetClose} />
              </SheetFooter>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
