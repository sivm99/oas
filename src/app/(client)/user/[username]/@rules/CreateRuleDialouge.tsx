import { Mail } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import type { Destination } from "@/types";
import { cn } from "@/lib/utils";

interface UserDialogProps {
  destinations: Destination[];
  onAction: (f: FormData) => void;
  onCancel?: () => void;
  c: number;
}

export const CreateRuleDialog = ({
  c,
  onAction,
  onCancel,
  destinations,
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

  const DialogForm = ({ className }: { className?: string }) => (
    <form
      action={onAction}
      className={cn("space-y-6 my-4 overflow-y-auto", className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          autoComplete="off"
          icon={Mail}
          id="alias"
          label="New Alias"
          maxLength={20}
          name="alias"
          pattern="^[a-zA-Z0-9][\w\.\-]{0,19}$"
          placeholder="space-king"
          required
          title="Alphanumeric with underscores,dots and hyphens"
          type="text"
        />
        <div className={cn(isDesktop ? "mt-6" : "mt-0")}>
          <Select
            defaultValue={`@${destinations[0].domain}`}
            name="domain"
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent position="popper">
              {destinations.map((dest) => (
                <SelectItem key={dest.destinationId} value={`@${dest.domain}`}>
                  @{dest.domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative z-0">
        <FormInput
          defaultValue={`Rule - ${c}`}
          id="rule-name"
          label="Rule Name (Optional)"
          maxLength={50}
          name="rule-name"
          placeholder="My adobe scan Id"
          type="text"
        />
      </div>

      <div className="relative z-0">
        <label className="block text-sm font-medium mb-2" htmlFor="comment">
          Rule Description (Optional)
        </label>
        <Textarea
          id="comment"
          maxLength={200}
          name="comment"
          placeholder="This Address is for Facebook"
        />
      </div>
      <div className="relative z-0">
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="destinationEmail"
        >
          Forwards To <span className="text-red-500 ml-1">*</span>
        </label>
        <Select
          defaultValue={destinations[0]?.destinationEmail}
          name="destinationEmail"
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select destination email" />
          </SelectTrigger>
          <SelectContent position="popper">
            {[
              ...new Map(
                destinations.map((dest) => [dest.destinationEmail, dest]),
              ).values(),
            ].map((dest) => (
              <SelectItem
                key={dest.destinationId}
                value={dest.destinationEmail}
              >
                {dest.destinationEmail}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isDesktop ? (
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCancel} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Save New Rule</Button>
        </DialogFooter>
      ) : (
        <Button className="w-full" type="submit">
          Save New Rule
        </Button>
      )}
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
            <DialogTitle>Create New Email Forwarding Rule</DialogTitle>
            <DialogDescription>
              All the emails sent to your created email address will be
              forwarded to you
            </DialogDescription>
          </DialogHeader>
          <DialogForm className="px-1" />
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
          <DrawerTitle>Create New Email Forwarding Rule</DrawerTitle>
          <DrawerDescription>
            All the emails sent to your created email address will be forwarded
            to you
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
