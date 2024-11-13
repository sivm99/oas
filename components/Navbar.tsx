import Logo from "@/components/assets/Logo";
import Link from "next/link";
import "@/Style/AnimatedHero.css";
import UserNavContent from "./nav-helper/UserNav";

export function NavbarClient() {
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
          <UserNavContent />
          {/* Mobile Navigation */}
        </div>
      </div>
    </nav>
  );
}
