import Link from "next/link";
import Logo from "@/components/assets/logo";
import "@/style/animated-hero.css";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default async function NavbarServer() {
  return (
    <nav className="nav_wrapper">
      <div className="app_container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              className="text-foreground flex items-center cursor-pointer"
              href="/"
            >
              <Logo size="big" />
              <div className="gradient_text text-2xl animate-fadeIn gradient-text-5">
                <span>1</span>
                <span>@</span>
                <span>S</span>
              </div>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <UserNavContent />
          {/* Mobile Navigation */}
        </div>
      </div>
    </nav>
  );
}

async function UserNavContent() {
  function DashboardButton() {
    return (
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <Link href="/">
          <Button
            className="w-full md:w-auto border-2 border-transparent animate-border-glow"
            variant="secondary"
          >
            Return Home
          </Button>
        </Link>
        {/* <Link href="/user/dash">
          <Button className="w-full md:w-auto">Dashboard</Button>
        </Link> */}
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
              <Menu aria-hidden="true" size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent
            aria-label="Menu"
            className="sm:w-2/3 md:w-1/2 lg:w-1/3"
            role="dialog"
            side="right"
          >
            <SheetHeader>
              <SheetTitle>One Alias Service</SheetTitle>
              <SheetDescription>Welcome</SheetDescription>
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
