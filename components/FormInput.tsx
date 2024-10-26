import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Link,
  FileText,
  Search,
  Hash,
  LucideIcon,
} from "lucide-react";
import "@/Style/Form.css";
import PasswordInput from "./PasswordInput";

// Define allowed input types
type InputType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "date"
  | "url"
  | "search"
  | "number"
  | "time"
  | "datetime-local";

// Define icon mapping type
type IconMapping = {
  [K in InputType | "name" | "username"]?: LucideIcon;
};

// Input props interface extending HTML input props
interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  name: string;
  label?: string;
  type?: InputType;
  error?: string;
  icon?: LucideIcon;
  className?: string;
}

const iconMapping: IconMapping = {
  text: FileText,
  email: Mail,
  password: Lock,
  tel: Phone,
  date: Calendar,
  url: Link,
  search: Search,
  number: Hash,
  name: User,
  username: User,
};

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      required = false,
      minLength,
      maxLength,
      pattern,
      className = "",
      error,
      icon: CustomIcon,
      ...props
    },
    ref,
  ) => {
    // Get appropriate icon based on type or name
    const getIcon = (): LucideIcon => {
      if (CustomIcon) return CustomIcon;
      return (
        iconMapping[type] || iconMapping[name as keyof IconMapping] || FileText
      );
    };

    const Icon = getIcon();

    return (
      <div className="grid w-full items-center gap-1.5">
        {label && (
          <Label htmlFor={name} className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <div className="relative">
          {type === "password" ? (
            <>
              <div className="absolute left-2 top-2.5 text-gray-500">
                <Icon className="h-4 w-4" />
              </div>
              <PasswordInput
                ref={ref}
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                className={`pl-8 ${className}`}
                error={!!error}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${name}-error` : undefined}
                {...props}
              />
            </>
          ) : (
            <>
              <div className="absolute left-2 top-2.5 text-gray-500">
                <Icon className="h-4 w-4" />
              </div>
              <Input
                ref={ref}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                className={`pl-8 ${error ? "border-red-500 focus-visible:ring-red-500" : ""} ${className}`}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${name}-error` : undefined}
                {...props}
              />
            </>
          )}
        </div>
        {error && (
          <p id={`${name}-error`} className="text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
