import { Button } from "@/components/ui/button";
import { Menu, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import SignOutButton from "./SignOutButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export interface UserNavContentProps {
  name?: string | null;
}

export default function UserNavContent({ name }: UserNavContentProps) {
  return (
    <>
      <div className="hidden md:flex items-center space-x-4">
        <ModeToggle />
        {name ? (
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
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className=" sm:w-2/3 md:w-1/2 lg:w-1/3">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-4">
              <ModeToggle />
              {name ? (
                <>
                  <Link href={`/user/dash`}>
                    <Button variant="outline" className="w-full justify-start">
                      <UserIcon size={20} className="mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <SignOutButton />
                </>
              ) : (
                <Link href="/login" className="w-full">
                  <Button variant="default" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
