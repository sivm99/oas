import { useEffect, useState } from "react";
import FormInput from "@/components/form-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Destination } from "@/types";
import { cn } from "@/lib/utils";

const domains = ["1as.in", "20032003.xyz", "n3y.in"];
interface UserDialogProps {
  destination?: Destination;
  userEmail?: string;
  onAction: (f: FormData) => void;
  onCancel?: () => void;
  cardTitle: string;
  cardDesc: string;
  type: "create" | "delete";
}

export const DestinationDialog = ({
  userEmail,
  // destination,
  type,
  cardTitle,
  cardDesc,
  onAction,
  onCancel,
}: UserDialogProps) => {
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

  const ShowForm = () => {
    if (type == "delete")
      return (
        <>
          <FormInput
            autoComplete="current-password"
            id="current-password"
            label="Current Password"
            maxLength={16}
            minLength={8}
            name="current-password"
            placeholder="••••••••"
            required
            type="password"
          />
        </>
      );
    if (type == "create")
      return (
        <>
          {/* <div className="flex gap-4"> */}
          <div className="flex-1">
            <FormInput
              defaultValue={userEmail}
              id="destination-email"
              label="Primary Email"
              name="destination-email"
              pattern="^[a-zA-Z0-9][a-zA-Z0-9_\.\-]{0,40}@[a-zA-Z0-9\.\-]{1,18}\.[a-zA-Z]{2,6}$"
              placeholder="Enter destination email"
              required
              type="email"
            />
          </div>
          <label
            className="block text-sm font-medium"
            htmlFor="destination-domain"
          >
            Domain <span className="text-red-500 ml-1">*</span>
          </label>
          <Select defaultValue={domains[0]} name="destination-domain" required>
            <SelectTrigger>
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((domain) => (
                <SelectItem id="destination-domain" key={domain} value={domain}>
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* </div> */}
        </>
      );
  };

  const DialogForm = ({ className }: { className?: string }) => (
    <form action={onAction} className={cn("grid gap-4 py-4", className)}>
      <ShowForm />
      {isDesktop && (
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCancel} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          {type == "delete" ? (
            <Button type="submit" variant="destructive">
              Delete Now
            </Button>
          ) : (
            <Button type="submit">Save Destination</Button>
          )}
        </DialogFooter>
      )}
      {!isDesktop &&
        (type === "delete" ? (
          <Button className="w-full" type="submit" variant="destructive">
            Delete Now
          </Button>
        ) : (
          <Button className="w-full" type="submit">
            Save Destination
          </Button>
        ))}
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
            <DialogTitle>{cardTitle}</DialogTitle>
            <DialogDescription>{cardDesc}</DialogDescription>
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
          <DrawerTitle>{cardTitle}</DrawerTitle>
          <DrawerDescription>{cardDesc}</DrawerDescription>
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
