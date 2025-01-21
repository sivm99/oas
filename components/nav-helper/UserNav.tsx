import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, AlertCircle } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
import { getLoginState } from "./action";
import { removeAuthCookie } from "@/utils/authcb";
import { redirect } from "next/navigation";
import Link from "next/link";
const HOST = process.env.HOST || "http://localhost:3000";

const StarBadge = () => (
  <div className="relative inline-flex items-center justify-center">
    <div className="absolute animate-pulse w-6 h-6 bg-yellow-300 rounded-full opacity-25"></div>
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-yellow-400 relative z-10 animate-pulse"
      fill="currentColor"
    >
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.2-6.3-4.8-6.3 4.8 2.3-7.2-6-4.6h7.6z" />
    </svg>
    <div className="absolute w-8 h-8 bg-yellow-400 rounded-full filter blur-xl opacity-30 animate-pulse"></div>
  </div>
);

const GalaxyBadge = () => (
  <div className="relative inline-flex items-center justify-center">
    <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin-slow opacity-40 blur-md"></div>
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      <div className="absolute inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping opacity-50"></div>
    </div>
  </div>
);

const PlanBadge = ({ plan }: { plan: "free" | "star" | "galaxy" }) => {
  if (plan === "free") return;
  if (plan === "star") return <StarBadge />;
  if (plan === "galaxy") return <GalaxyBadge />;
  return null;
};

export default async function UserNavContent() {
  const { status, lastUsername, plan } = await getLoginState();

  function DashboardButton() {
    if (status === "logged-out") {
      return (
        <>
          <form action="/login" className="md:hidden">
            <Button type="submit" className="w-full md:w-auto">
              Login
            </Button>
          </form>
          <Link href="/login" className="hidden md:block">
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        </>
      );
    }

    return (
      <div className="flex flex-col md:flex-row gap-2">
        <form action={`/user/${lastUsername}`} className="md:hidden">
          <Button
            variant="secondary"
            className="border-2 border-transparent animate-border-glow w-full md:w-auto relative"
            type="submit"
          >
            Dashboard
            {status === "expired" && (
              <AlertCircle className="w-4 h-4 ml-2 text-yellow-500" />
            )}
          </Button>
        </form>
        <Link href={`/user/${lastUsername}`} className="hidden md:block">
          <Button
            variant="secondary"
            className="border-2 border-transparent animate-border-glow w-full md:w-auto relative"
          >
            Dashboard
            {status === "expired" && (
              <AlertCircle className="w-4 h-4 ml-2 text-yellow-500" />
            )}
          </Button>
        </Link>
        {status === "logged-in" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full md:w-auto">
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
                <form
                  action={async () => {
                    "use server";
                    await removeAuthCookie();
                    redirect(HOST);
                  }}
                >
                  <Button
                    variant="destructive"
                    type="submit"
                    className="w-full md:w-auto"
                  >
                    Logout
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:flex items-center space-x-2">
        {status === "logged-in" && <PlanBadge plan={plan || "free"} />}
        <ModeToggle />
        {/* (!plan || plan === "free") && (
          <Link href="/pricing">
            <Button variant="outline" className="w-full md:w-auto">
              Pricing
            </Button>
          </Link>
        )*/}
        <DashboardButton />
      </div>
      <div className="md:hidden">
        <ModeToggle />
        <Sheet>
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
              <SheetDescription>
                {lastUsername ? `Hello ${lastUsername}` : "Welcome"}
                {status === "logged-in" && <PlanBadge plan={plan || "free"} />}
              </SheetDescription>
            </SheetHeader>
            <nav>
              <SheetFooter className="mt-4 flex flex-col gap-4">
                {/*(!plan || plan === "free") && (
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full">
                      Pricing
                    </Button>
                  </Link>
                )*/}
                <DashboardButton />
              </SheetFooter>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
