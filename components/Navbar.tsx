import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Logo from "@/components/assets/Logo";
import Link from "next/link";
import "@/Style/AnimatedHero.css";
import { UserNavContent } from "./nav-helper/UserNav";
import { User } from "@/Helper/types";

export default async function Navbar({ user }: { user?: User }) {
  return (
    <nav className="nav_wrapper">
      <div className="app_container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-foreground flex items-center cursor-pointer"
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
          <UserNavContent user={user} />

          {/* Mobile Navigation */}
          <div className="md:hidden group">
            <Button variant="outline">
              <Menu size={20} />
            </Button>
            <div className="nav_menu">
              <UserNavContent user={user} isMobile={true} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
