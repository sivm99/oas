import NavbarServer from "@/components/NavbarServer";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
// import { useEffect } from "react";

function NotFound() {
  return (
    <>
      <NavbarServer />
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <AlertCircle className="w-32 h-32 sm:w-40 sm:h-40 text-red-500 mb-8" />
        <h1 className="text-6xl sm:text-7xl font-bold mb-4 text-center">
          Not Found
        </h1>
        <p className="text-2xl sm:text-3xl mb-8 text-center">
          We don&apos;t found that resource. Sorry!
        </p>
        <Link href="/" className="w-full sm:w-auto">
          <Button
            variant="secondary"
            className="w-full text-2xl sm:text-3xl py-6 border-4 border-transparent animate-border-glow"
          >
            Home
          </Button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
