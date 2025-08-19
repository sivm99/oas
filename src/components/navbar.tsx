import Link from "next/link";
import Logo from "@/components/assets/logo";
import "@/style/animated-hero.css";
import UserNavContent from "./nav-helper/user-nav";

export default async function NavbarClient() {
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
