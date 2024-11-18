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
import { Textarea } from "@/components/ui/textarea";
import { Destination } from "@/Helper/types";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface UserDialogProps {
  destinations: Destination[];
  onAction: (f: FormData) => void;
  onCancel?: () => void;
}

export const CreateRuleDialog = ({
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
          type="text"
          name="alias"
          id="alias"
          label="New Alias"
          icon={Mail}
          placeholder="space-king"
          autoComplete="off"
          required
          pattern="^[a-zA-Z0-9][\w\.\-]{0,19}$"
          title="Alphanumeric with underscores,dots and hyphens"
          maxLength={20}
        />
        <div className={cn(isDesktop ? "mt-6" : "mt-0")}>
          <Select
            name="domain"
            required
            defaultValue={`@${destinations[0].domain}`}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent position="popper">
              {destinations.map((dest) => (
                <SelectItem key={dest.destinationID} value={`@${dest.domain}`}>
                  @{dest.domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative z-0">
        <FormInput
          type="text"
          id="rule-name"
          name="rule-name"
          label="Rule Name (Optional)"
          maxLength={50}
          placeholder="My adobe scan Id"
        />
      </div>

      <div className="relative z-0">
        <label className="block text-sm font-medium mb-2" htmlFor="comment">
          Rule Description (Optional)
        </label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="This Address is for Facebook"
          maxLength={200}
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
          name="destinationEmail"
          defaultValue={destinations[0].destinationEmail}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select destination email" />
          </SelectTrigger>
          <SelectContent position="popper">
            {destinations.map((dest) => (
              <SelectItem
                key={dest.destinationID}
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
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Save New Rule</Button>
        </DialogFooter>
      ) : (
        <Button type="submit" className="w-full">
          Save New Rule
        </Button>
      )}
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
          <DrawerTitle>Create New Email Forwarding Rule</DrawerTitle>
          <DrawerDescription>
            All the emails sent to your created email address will be forwarded
            to you
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
