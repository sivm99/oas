import FormInput from "@/components/FormInput";
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
import { Destination } from "@/Helper/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
            name="current-password"
            type="password"
            required
            id="current-password"
            placeholder="••••••••"
            autoComplete="current-password"
            label="Current Password"
            minLength={8}
            maxLength={16}
          />
        </>
      );
    if (type == "create")
      return (
        <>
          {/* <div className="flex gap-4"> */}
          <div className="flex-1">
            <FormInput
              type="email"
              placeholder="Enter destination email"
              name="destination-email"
              id="destination-email"
              defaultValue={userEmail}
              required
              label="Primary Email"
            />
          </div>
          <label
            className="block text-sm font-medium"
            htmlFor="destination-domain"
          >
            Domain <span className="text-red-500 ml-1">*</span>
          </label>
          <Select name="destination-domain" defaultValue={domains[0]} required>
            <SelectTrigger>
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((domain) => (
                <SelectItem key={domain} value={domain} id="destination-domain">
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
            <Button type="button" variant="outline" onClick={onCancel}>
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
          <Button type="submit" variant="destructive" className="w-full">
            Delete Now
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Save Destination
          </Button>
        ))}
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
          <DrawerTitle>{cardTitle}</DrawerTitle>
          <DrawerDescription>{cardDesc}</DrawerDescription>
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
