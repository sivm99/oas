import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import { Rule } from "@/Helper/types";

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
      title: "Delete Rule",
      description: `Are you sure you want to delete ${rule.name || rule.aliasEmail}? This action is permanent and cat be reverted`,
      actionText: "Confirm Delete",
      fields: [],
    },
    toggle: {
      title: rule.active ? "Disable Rule" : "Enable Rule",
      description: rule.active
        ? `All emails to ${rule.aliasEmail} will be rejected automatically.`
        : `All emails sent to ${rule.aliasEmail} will start forwarding to ${rule.destinationEmail}`,
      actionText: rule.active ? "Disable Rule" : "Enable Rule",
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
      <div key={field.id} className="grid gap-2">
        <Label htmlFor={field.id}>{field.label}</Label>
        <Input
          type={field.type}
          id={field.id}
          name={field.id}
          defaultValue={field.defaultValue}
        />
      </div>
    ));
  };
  // Common dialog content component
  const DialogForm = ({ className }: { className?: string }) => (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      {renderFields()}
      {isDesktop && (
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{config.title}</DialogTitle>
            <DialogDescription>{config.description}</DialogDescription>
          </DialogHeader>
          <DialogForm />
        </DialogContent>
      </Dialog>
    );
  }

  // Render mobile drawer
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
          <DrawerTitle>{config.title}</DrawerTitle>
          <DrawerDescription>{config.description}</DrawerDescription>
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
