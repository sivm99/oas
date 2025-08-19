"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  className?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = "", error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          className={`pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""} ${className}`}
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <button
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 mr-9"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
          type="button"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
