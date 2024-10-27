"use client";
import useAppContext from "@/hooks/useAppContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, InfoIcon } from "lucide-react";

interface PopupProps {
  error?: boolean;
}

function Popup({ error = false }: PopupProps) {
  const { error: errorMsg, setError, hint, setHint } = useAppContext();

  const handleClose = () => {
    if (error) {
      setError("");
    } else {
      setHint("");
    }
  };

  const message = error ? errorMsg : hint;
  const isOpen = error ? !!errorMsg : !!hint;

  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw] mx-auto">
        <DialogHeader>
          <DialogTitle
            className={`flex items-center gap-2 ${error ? "text-destructive" : "text-primary"}`}
          >
            {error ? <AlertCircle size={20} /> : <InfoIcon size={20} />}
            {error ? "Error Occurred" : "Helpful Hint"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground break-words whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleClose}
            variant={error ? "default" : "outline"}
            className={error ? "" : "bg-secondary hover:bg-secondary/80"}
          >
            {error ? "Okay" : "Got it!"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Popup;
