import { AlertCircle } from "lucide-react";
import Link from "next/link";
import NavbarServer from "@/components/navbar-server";
import { Button } from "@/components/ui/button";

// import { useEffect } from "react";

function NotFound() {
  return (
    <>
      <NavbarServer />
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <AlertCircle className="w-32 h-32 sm:w-40 sm:h-40 text-destructive mb-8" />
        <h1 className="text-6xl sm:text-7xl font-bold mb-4 text-center">
          Not Found
        </h1>
        <p className="text-2xl sm:text-3xl mb-8 text-center">
          We don&apos;t found that resource. Sorry!
        </p>
        <Link className="w-full sm:w-auto" href="/">
          <Button
            className="w-full text-2xl sm:text-3xl py-6 border-4 border-transparent animate-border-glow"
            variant="secondary"
          >
            Home
          </Button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
