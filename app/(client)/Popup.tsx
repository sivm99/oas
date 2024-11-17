"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, InfoIcon, LogOut } from "lucide-react";
import { db } from "@/Helper/dbService";
import { useRouter } from "next/navigation";
import useSimpleAppContext from "@/hooks/useSimpleAppContext";

interface PopupProps {
  error?: boolean;
}

function Popup({ error = false }: PopupProps) {
  const router = useRouter();
  const {
    error: errorMsg,
    setError,
    hint,
    setHint,
    loginExpired,
    setLoginExpired,
  } = useSimpleAppContext();

  const handleClose = () => {
    if (error) {
      setError("");
    } else if (loginExpired) {
      setLoginExpired(false);
    } else {
      setHint("");
    }
  };

  const handleLogin = () => {
    // Clear storage before redirecting
    localStorage.clear();
    db.clearAll();
    handleClose();
    router.push("/login");
  };

  // Determine message and open state based on type
  const message = error
    ? errorMsg
    : loginExpired
      ? "Your session has expired. Please login again to continue."
      : hint;

  const isOpen = error ? !!errorMsg : loginExpired ? true : !!hint;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw] mx-auto">
        <DialogHeader>
          <DialogTitle
            className={`flex items-center gap-2 ${
              error
                ? "text-destructive"
                : loginExpired
                  ? "text-yellow-500"
                  : "text-primary"
            }`}
          >
            {error ? (
              <AlertCircle size={20} />
            ) : loginExpired ? (
              <LogOut size={20} />
            ) : (
              <InfoIcon size={20} />
            )}
            {error
              ? "Error Occurred"
              : loginExpired
                ? "Session Expired"
                : "Notice"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground break-words whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={loginExpired ? "flex gap-2 sm:gap-0" : ""}>
          {loginExpired ? (
            <>
              <Button
                onClick={handleClose}
                variant="outline"
                className="bg-secondary hover:bg-secondary/80"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogin}
                variant="default"
                className="bg-primary hover:bg-primary/80"
              >
                Login Now
              </Button>
            </>
          ) : (
            <Button
              onClick={handleClose}
              variant={error ? "default" : "outline"}
              className={error ? "" : "bg-secondary hover:bg-secondary/80"}
            >
              {error ? "Okay" : "Got it!"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Popup;
