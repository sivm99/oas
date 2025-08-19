import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { HOST } from "@/env";
import { removeSomeCookie } from "@/helper/cookie-helper";
import { Button } from "../ui/button";
import { getLoginState } from "./action";

export default async function LogoutButton() {
  const { status, lastUsername } = await getLoginState();

  if (status === "logged-out") {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full justify-center px-6 md:px-1">
        <Link className="w-full md:w-auto" href="/signup">
          <Button
            className="w-full border-2 border-transparent animate-border-glow"
            type="submit"
            variant="secondary"
          >
            Register
          </Button>
        </Link>
        <Link className="w-full md:w-auto" href="/login">
          <Button className="w-full" type="submit">
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full justify-center px-6 md:px-1">
      <Link className="w-full md:w-auto" href={`/user/${lastUsername}`}>
        <Button
          className="border-2 border-transparent animate-border-glow w-full relative"
          variant="secondary"
        >
          Dashboard
          {status === "expired" && (
            <AlertCircle className="w-4 h-4 ml-2 text-yellow-500" />
          )}
        </Button>
      </Link>
      {status === "expired" && (
        <Link className="w-full md:w-auto" href="/login">
          <Button className="w-full" type="submit">
            Login
          </Button>
        </Link>
      )}
      {status === "logged-in" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto" variant="destructive">
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
                  await removeSomeCookie("token");
                  await removeSomeCookie("lastUsername");
                  redirect(HOST);
                }}
                className="w-full"
              >
                <Button
                  className="w-full md:w-auto"
                  type="submit"
                  variant="destructive"
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
