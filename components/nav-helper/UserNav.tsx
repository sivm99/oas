import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import LogoutButton from "./LogoutButton";

export interface UserNavContentProps {
  name?: string | null;
}

export default function UserNavContent() {
  return (
    <>
      <div className="hidden  md:flex items-center space-x-2">
        <ModeToggle />
        <LogoutButton />
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
              <SheetTitle>One Alias Service</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-4">
              <ModeToggle />
              <LogoutButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
