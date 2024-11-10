import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface UserDialogProps {
  onAction: (f: FormData) => void;
  onCancel?: () => void;
}

export const UserDialog = ({ onAction, onCancel }: UserDialogProps) => {
  const [open, setOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768,
  );

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const DialogForm = ({ className }: { className?: string }) => (
    <form action={onAction} className={cn("grid gap-4 py-4", className)}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="newName">New Name</Label>
        <Input
          id="newName"
          name="newName"
          placeholder="New Name"
          minLength={4}
          // defaultValue={name}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="new-username" className=" whitespace-nowrap">
          New Username
        </Label>
        <Input
          id="new-username"
          name="new-username"
          title="4-16 characters, starting with a letter, and containing only letters, numbers, dots, underscores, or hyphens."
          className="col-span-3"
          placeholder="flying-selfie"
          minLength={4}
          // pattern="^[a-zA-Z][a-zA-Z0-9._-]*$"
          pattern="^[a-zA-Z]\S*$"
          maxLength={16}
        />
      </div>
      {isDesktop && (
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Update Details</Button>
        </DialogFooter>
      )}
      {!isDesktop && <Button type="submit">Update Details</Button>}
    </form>
  );

  // Render Desktop Dialog
  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
          if (!newOpen && onCancel) {
            onCancel();
          }
        }}
      >
        <DialogTrigger asChild>
          {/* <Button variant={triggerVariant}>
            {triggerText || config.title}
          </Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Your Details</DialogTitle>
            <DialogDescription>
              Enter Name or Userame or both and that will be instantly updated
            </DialogDescription>
          </DialogHeader>
          <DialogForm />
        </DialogContent>
      </Dialog>
    );
  }

  // Render Mobile Version
  return (
    <Drawer
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen && onCancel) {
          onCancel();
        }
      }}
    >
      <DrawerTrigger asChild>
        {/* <Button variant={triggerVariant}>{triggerText || config.title}</Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update Your Details</DrawerTitle>
          <DrawerDescription>
            Enter Name or Username or Both and that will be instantly updated
          </DrawerDescription>
        </DrawerHeader>
        <DialogForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
