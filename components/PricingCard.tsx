"use client";

import { Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlowButton } from "@/components/ui/glow-button";

interface Feature {
  text: string;
  description?: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  currency: string;
  features: Feature[];
  unavailableFeatures: Feature[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  popular?: boolean;
  plan: string;
}

export default function PricingCard({
  title,
  price,
  currency,
  features,
  unavailableFeatures,
  buttonText,
  buttonVariant,
  popular = false,
  plan,
}: PricingCardProps) {
  return (
    <Card
      className={`w-full rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg ${
        popular
          ? "border-primary shadow-md scale-105 hover:shadow-primary/20"
          : "border-muted hover:border-muted-foreground/20"
      }`}
    >
      {popular && (
        <div className="bg-primary py-1 text-center">
          <Badge
            variant="outline"
            className="bg-primary text-primary-foreground border-primary-foreground"
          >
            MOST POPULAR
          </Badge>
        </div>
      )}

      <CardHeader className="text-center p-6">
        <h3 className={`text-xl md:text-2xl font-bold`}>{title}</h3>
        <div className="mt-4 flex items-end justify-center">
          <span className="text-3xl md:text-4xl font-bold">
            {currency}
            {price}
          </span>
          <span className="text-muted-foreground ml-1">/month</span>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <Check
                className={`h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-green-500`}
              />
              <span
                className={`${price !== "0" ? "hover:text-gradient-animate" : ""}`}
              >
                {feature.text}
              </span>
            </li>
          ))}
          {unavailableFeatures.map((feature, index) => (
            <li
              key={index}
              className="flex items-start text-muted-foreground group"
            >
              <X className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {price === "0" ? (
          <form action="/signup" className="w-full">
            <GlowButton
              glowVariant="subtle"
              variant={buttonVariant}
              className="w-full py-6 font-medium"
              type="submit"
            >
              {buttonText}
            </GlowButton>
          </form>
        ) : (
          <form action="/pricing" className="w-full">
            <input type="hidden" name="plan" value={plan} />
            <GlowButton
              glowVariant={popular ? "premium" : "standard"}
              glowText={popular}
              variant={popular ? "default" : buttonVariant}
              className="w-full py-6 font-medium"
              type="submit"
            >
              {buttonText}
            </GlowButton>
          </form>
        )}
      </CardFooter>

      {/* Add a subtle background glow for popular plans */}
      {popular && (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
          <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-20 group-hover:opacity-40">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-primary opacity-50 blur-xl animate-rotate-gradient" />
          </div>
        </div>
      )}
    </Card>
  );
}
