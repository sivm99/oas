import { Button } from "./ui/button";
import { LogOut, Menu, User } from "lucide-react";
import Logo from "@/components/assets/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// ("use server");

export default function Navbar() {
  const { user, signOut } = useAuth();

  async function handleSignOut(formData: FormData) {
    "use server";
    console.log(formData);
    await signOut;
  }
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-foreground flex items-center cursor-pointer"
            >
              <Logo size="big" />
              <div className="inline-block text-transparent bg-clip-text animate-fadeIn gradient-text-5 text-2xl font-bold">
                <span>1</span>
                <span>@</span>
                <span>S</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            {user ? (
              <>
                <Link href={`/user/${user.username}`}>
                  <Button variant="outline">
                    <User size={20} />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <LogOut className="h-5 w-5" />
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to logout?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will end your current session.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <form action={handleSignOut}>
                          <Button type="submit" variant="destructive">
                            Logout
                          </Button>
                        </form>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <Link href="/login">
                <Button variant="default">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden group">
            <Button variant="outline">
              <Menu size={20} />
            </Button>
            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg p-4">
              <div className="flex flex-col space-y-4">
                <ModeToggle />
                {user ? (
                  <Link href={`/user/${user.username}`}>
                    <Button variant="outline" className="w-full">
                      <User size={20} className="mr-2" />
                      Profile
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button variant="default" className="w-full">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
