import { Button } from "../ui/button";
import Link from "next/link";
const HOST = process.env.HOST || "http://localhost:3000";

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
import { getLoginState } from "./action";
import { removeAuthCookie } from "@/utils/authcb";
import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default async function LogoutButton() {
  const { status, lastUsername } = await getLoginState();

  if (status === "logged-out") {
    return (
      <Link href="/login" className="w-full md:w-auto">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full justify-center px-6 md:px-1">
      <Link href={`/user/${lastUsername}`} className="w-full md:w-auto">
        <Button
          variant="secondary"
          className="border-2 border-transparent animate-border-glow w-full relative"
        >
          Dashboard
          {status === "expired" && (
            <AlertCircle className="w-4 h-4 ml-2 text-yellow-500" />
          )}
        </Button>
      </Link>
      {status === "expired" && (
        <Link href="/login" className="w-full md:w-auto">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Link>
      )}
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
                className="w-full"
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
