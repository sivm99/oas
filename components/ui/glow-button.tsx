// components/ui/glow-button.tsx
"use client";

import React, { useRef, useState } from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonProps {
  glowVariant?: "standard" | "premium" | "subtle";
  glowColor?: string;
  glowText?: boolean;
}

export const GlowButton = ({
  children,
  className,
  glowVariant = "standard",
  glowColor,
  glowText = false,
  ...props
}: GlowButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Define colors based on variant
  const getGlowColors = () => {
    if (glowColor) return glowColor;

    switch (glowVariant) {
      case "premium":
        return "bg-gradient-to-r from-purple-500 via-pink-500 to-primary";
      case "subtle":
        return "bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400";
      case "standard":
      default:
        return "bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500";
    }
  };

  // Dynamic className based on variant
  const variantClass = {
    premium: "glow-button-premium",
    standard: "glow-button-standard",
    subtle: "hover:bg-secondary/80 transition-colors",
  };

  // Dynamic border animation
  const borderAnimation = {
    premium: "animate-border-glow-premium",
    standard: "animate-border-glow-standard",
    subtle: "",
  };

  return (
    <Button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative overflow-hidden group transition-all duration-300",
        variantClass[glowVariant],
        className,
      )}
      {...props}
    >
      {/* Text with optional gradient effect */}
      <span
        className={cn(
          "relative z-10",
          glowText && glowVariant === "premium" && " ",
        )}
      >
        {children}
      </span>

      {/* Cursor follow glow effect */}
      {(glowVariant === "premium" || glowVariant === "standard") && (
        <span
          className={cn(
            "absolute rounded-full w-32 h-32 blur-xl opacity-0 transition-opacity duration-200 pointer-events-none",
            isHovering ? "opacity-60" : "opacity-0",
            getGlowColors(),
          )}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Animated border */}
      {(glowVariant === "premium" || glowVariant === "standard") && (
        <span
          className={cn(
            "absolute inset-0 rounded-md border-2 z-0",
            borderAnimation[glowVariant],
          )}
        />
      )}

      {/* Shimmer effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </Button>
  );
};
