"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, InfoIcon, LogOut, Crown } from "lucide-react";
import { db } from "@/Helper/dbService";
import { useRouter } from "next/navigation";
import useSimpleAppContext from "@/hooks/useSimpleAppContext";
import Link from "next/link";

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
    setPremiumMessage
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw] mx-auto">
        <DialogHeader>
          <DialogTitle 
            className={`flex items-center gap-2 ${
              error 
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
          <DialogDescription></DialogDescription>
          <div className="text-muted-foreground break-words whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
            {message}
          </div>
        </DialogHeader>
        <DialogFooter className={loginExpired || isPremium ? "flex gap-2 sm:gap-0" : ""}>
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
          ) : isPremium ? (
            <>
              <Button
                onClick={handleClose}
                variant="outline"
                className="bg-secondary hover:bg-secondary/80"
              >
                Maybe Later
              </Button>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button
                  variant="default"
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  View Pricing
                </Button>
              </Link>
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
