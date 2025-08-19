"use client";

import { AlertCircle, Crown, InfoIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db } from "@/helper/db-service";
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
    premiumMessage,
    setPremiumMessage,
  } = useSimpleAppContext();

  const handleClose = () => {
    if (error) {
      setError("");
    } else if (loginExpired) {
      setLoginExpired(false);
    } else if (premiumMessage) {
      setPremiumMessage("");
    } else {
      setHint("");
    }
  };

  const handleLogin = () => {
    localStorage.clear();
    db.clearAll();
    handleClose();
    router.push("/login");
  };

  const message = error
    ? errorMsg
    : loginExpired
      ? "Your session has expired. Please login again to continue."
      : premiumMessage
        ? premiumMessage
        : hint;

  const isOpen = error
    ? !!errorMsg
    : loginExpired
      ? true
      : premiumMessage
        ? !!premiumMessage
        : !!hint;

  const isPremium = !!premiumMessage;

  return (
    <Dialog onOpenChange={handleClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw] mx-auto">
        <DialogHeader>
          <DialogTitle
            className={`flex items-center gap-2 ${error
              ? "text-destructive"
              : loginExpired
                ? "text-yellow-500"
                : isPremium
                  ? "text-amber-500"
                  : "text-primary"
              }`}
          >
            {error ? (
              <AlertCircle size={20} />
            ) : loginExpired ? (
              <LogOut size={20} />
            ) : isPremium ? (
              <Crown size={20} />
            ) : (
              <InfoIcon size={20} />
            )}
            {error
              ? "Error Occurred"
              : loginExpired
                ? "Session Expired"
                : isPremium
                  ? "Premium Feature"
                  : "Notice"}
          </DialogTitle>
          <DialogDescription />
          <div className="text-muted-foreground break-words whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
            {message}
          </div>
        </DialogHeader>
        <DialogFooter
          className={loginExpired || isPremium ? "flex gap-2 sm:gap-0" : ""}
        >
          {loginExpired ? (
            <>
              <Button
                className="bg-secondary hover:bg-secondary/80"
                onClick={handleClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/80"
                onClick={handleLogin}
                variant="default"
              >
                Login Now
              </Button>
            </>
          ) : isPremium ? (
            <>
              <Button
                className="bg-secondary hover:bg-secondary/80"
                onClick={handleClose}
                variant="outline"
              >
                Maybe Later
              </Button>
              <Link className="w-full sm:w-auto" href="/pricing">
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600"
                  variant="default"
                >
                  View Pricing
                </Button>
              </Link>
            </>
          ) : (
            <Button
              className={error ? "" : "bg-secondary hover:bg-secondary/80"}
              onClick={handleClose}
              variant={error ? "default" : "outline"}
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
