import { useEffect, useState } from "react";
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
import { UploadButton } from "@/lib/uploadthing";

interface UserDialogProps {
  onAction: (f: FormData) => void;
  onCancel?: () => void;
  type?: "pic" | "basic";
}

export const UserDialog = ({ onAction, onCancel, type }: UserDialogProps) => {
  const [open, setOpen] = useState(true);
  const [avatar, setAvatar] = useState("");
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
      {type === "basic" && (
        <>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newName">New Name</Label>
            <Input
              className="col-span-3"
              id="newName"
              maxLength={64}
              minLength={4}
              name="newName"
              pattern="^[a-zA-Z\s]*$"
              placeholder="New Name"
              // defaultValue={name}
              title="Only Alphabets Allowed"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className=" whitespace-nowrap" htmlFor="new-username">
              New Username
            </Label>
            <Input
              className="col-span-3"
              id="new-username"
              maxLength={15}
              minLength={4}
              name="new-username"
              pattern="^[a-zA-Z][a-zA-Z0-9\._\-]*$"
              placeholder="flying-selfie"
              title="Starts with Alphbet, can have Alphanumerics,dots,underscores and hyphens"
              type="text"
            />
          </div>
        </>
      )}
      {type === "pic" && (
        <>
          <input
            defaultValue={avatar}
            hidden
            id="avatar-url"
            minLength={1}
            name="avatar-url"
            required
            type="text"
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (!res?.[0]) return;
              setAvatar(res[0].ufsUrl);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />{" "}
        </>
      )}

      {isDesktop && (
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCancel} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Update Profile</Button>
        </DialogFooter>
      )}
      {!isDesktop && <Button type="submit">Update Profile</Button>}
    </form>
  );

  // Render Desktop Dialog
  if (isDesktop) {
    return (
      <Dialog
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
          if (!newOpen && onCancel) {
            onCancel();
          }
        }}
        open={open}
      >
        <DialogTrigger asChild>
          {/* <Button variant={triggerVariant}>
            {triggerText || config.title}
          </Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Your Profile</DialogTitle>
            <DialogDescription>
              {type === "basic"
                ? " Enter Name or Userame or both and that will be instantly updated"
                : "Upload PNG/JPEG/SVG 128KB Limit"}
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
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen && onCancel) {
          onCancel();
        }
      }}
      open={open}
    >
      <DrawerTrigger asChild>
        {/* <Button variant={triggerVariant}>{triggerText || config.title}</Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update Your Profile</DrawerTitle>
          <DrawerDescription>
            {type === "basic"
              ? " Enter Name or Userame or both and that will be instantly updated"
              : "Upload PNG/JPEG/SVG 128KB limit"}
          </DrawerDescription>
        </DrawerHeader>
        <DialogForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
