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
const HOST = process.env.HOST || "http://localhost:3000";

export default async function UserNavContent() {
  const { status, lastUsername } = await getLoginState();

  function DashboardButton() {
    if (status === "logged-out") {
      return (
        <form action="/login">
          <Button type="submit" className="w-full md:w-auto">
            Login
          </Button>
        </form>
      );
    }

    return (
      <div className="flex flex-col md:flex-row  gap-2">
        <form action={`/user/${lastUsername}`}>
          <Button
            variant="secondary"
            className="border-2 border-transparent animate-border-glow w-full md:w-auto relative"
          >
            Dashboard
            {status === "expired" && (
              <AlertCircle className="w-4 h-4 ml-2 text-yellow-500" />
            )}
          </Button>
        </form>

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
                  <Button variant="destructive" type="submit">
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
        <ModeToggle />
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
              </SheetDescription>
            </SheetHeader>
            <nav>
              <SheetFooter className="mt-4 flex flex-col gap-4">
                <DashboardButton />
              </SheetFooter>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
