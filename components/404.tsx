import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    document.title = "404: Not Found";
    // Set the HTTP status code to 404
    const meta = document.createElement("meta");
    meta.httpEquiv = "status";
    meta.content = "404";
    document.getElementsByTagName("head")[0].appendChild(meta);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <AlertCircle className="w-32 h-32 sm:w-40 sm:h-40 text-red-500 mb-8" />
      <h1 className="text-6xl sm:text-7xl font-bold mb-4 text-center">
        404 Not Found
      </h1>
      <p className="text-2xl sm:text-3xl mb-8 text-center">
        We don't found that resource. Sorry!
      </p>
      <Button
        onClick={() => redirect("/")}
        variant="outline"
        className="text-xl sm:text-2xl border-2 border-transparent animate-border-glow"
      >
        Go to Home
      </Button>
    </div>
  );
}

export default NotFound;
