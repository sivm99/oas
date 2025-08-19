import { AlertTriangle } from "lucide-react";
import React, { useState } from "react";
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
import type { Rule } from "@/types";
import { cn } from "@/lib/utils";

// Define the types for the rule and dialog props

interface RuleDialogProps {
  rule: Rule;
  type: "edit" | "delete" | "toggle";
  // triggerText?: string;
  // triggerVariant?: "default" | "outline" | "secondary" | "ghost";
  onAction: (rule: Rule) => void;
  onCancel?: () => void;
}

export const RuleDialog: React.FC<RuleDialogProps> = ({
  rule,
  type,
  // triggerText,
  // triggerVariant = "outline",
  onAction,
  onCancel,
}) => {
  const [open, setOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768,
  );

  React.useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Configuration for different dialog types
  const dialogConfig = {
    edit: {
      title: "Edit Rule",
      description: "Change Either Name or Description Of your Rule",
      actionText: "Save Changes",
      fields: [
        {
          label: "Rule Name",
          id: "ruleName",
          type: "text",
          defaultValue: rule.name,
        },
        {
          label: "Rule Description",
          id: "ruleDescription",
          type: "text",
          defaultValue: rule.comment,
        },
      ],
    },
    delete: {
      title: (
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="text-red-400" size={20} /> Delete Rule{" "}
        </div>
      ),
      description: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p>
              You are about to permanently delete:
              <span className="mx-2 px-3 py-1 bg-destructive/10 dark:bg-white rounded-md font-mono text-red-500 font-bold">
                {rule.name || rule.aliasEmail}
              </span>
            </p>

            <p className="">
              <strong className="text-destructive ">
                This action cannot be undone
              </strong>{" "}
              and poses significant security risks. Once deleted, this alias may
              be claimed by others, potentially exposing sensitive
              communications.
            </p>

            <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md border border-transparent animate-border-glow">
              💡 Consider disabling the rule instead if you may need it in the
              future.
            </p>
          </div>

          <p className="font-medium text-foreground">
            Are you absolutely certain you wish to proceed?
          </p>
        </div>
      ),
      actionText: "Confirm Delete",
      fields: [],
    },
    toggle: {
      title: rule.isActive ? "Disable Rule" : "Enable Rule",
      description: rule.isActive
        ? `All emails to ${rule.aliasEmail} will be rejected automatically.`
        : `All emails sent to ${rule.aliasEmail} will start forwarding to ${rule.destinationEmail}`,
      actionText: rule.isActive ? "Disable Rule" : "Enable Rule",
      fields: [],
    },
  };

  const config = dialogConfig[type];

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For edit type, collect form data
    if (type === "edit") {
      const formData = new FormData(e.target as HTMLFormElement);
      const updatedRule = {
        ...rule,
        name: formData.get("ruleName") as string,
        comment: formData.get("ruleDescription") as string,
      };
      onAction(updatedRule);
    } else {
      // For delete and toggle, pass the original rule
      onAction(rule);
    }

    setOpen(false);
  };

  // Render form fields based on dialog type
  const renderFields = () => {
    return config.fields.map((field) => (
      <div className="grid gap-2" key={field.id}>
        <Label htmlFor={field.id}>{field.label}</Label>
        <Input
          defaultValue={field.defaultValue}
          id={field.id}
          name={field.id}
          type={field.type}
        />
      </div>
    ));
  };
  // Common dialog content component
  const DialogForm = ({ className }: { className?: string }) => (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleSubmit}
    >
      {renderFields()}
      {isDesktop && (
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onCancel} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">{config.actionText}</Button>
        </DialogFooter>
      )}
      {!isDesktop && <Button type="submit">{config.actionText}</Button>}
    </form>
  );

  // Render desktop dialog
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{config.title}</DialogTitle>
            {config.actionText == "Confirm Delete" ? (
              <>
                <DialogDescription>Proceed With Caution</DialogDescription>{" "}
                {config.description}
              </>
            ) : (
              <DialogDescription>{config.description}</DialogDescription>
            )}
          </DialogHeader>
          <DialogForm />
        </DialogContent>
      </Dialog>
    );
  }

  // Render mobile drawer
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
          <DrawerTitle>{config.title}</DrawerTitle>
          <DrawerDescription>{config.description}</DrawerDescription>
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
