// app/pricing/PaymentModal.tsx
"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import paymentAction from "./actions";
import { User } from "@/Helper/types";
import { GlowButton } from "@/components/ui/glow-button";

// Types
type PaymentOptions = "phonepe" | "googlepay" | "paytm";

interface PaymentDetailsProps {
  plan: User["plan"];
  price: string;
  // currency: string;
  planTitle: string;
  months?: number;
  onMonthsChange?: (months: number) => void;
}

// Main Payment Modal Component
export default function PaymentModal({
  plan,
  price,
  planTitle,
  // currency,
}: PaymentDetailsProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentOptions>("phonepe");
  const [months, setMonths] = useState<number>(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentData, formAction, isPending] = useActionState(
    paymentAction,
    null,
  );

  // Calculate price based on duration
  const calculatePrice = (basePrice: number, months: number) => {
    if (months === 1) return basePrice * 2;
    if (months === 3) return basePrice + 30;
    if (months === 6) return basePrice + 20;
    return basePrice; // 12+ months
  };

  const basePrice = parseInt(price);
  const adjustedPrice = calculatePrice(basePrice, months);
  const totalPrice = adjustedPrice * months;
  // const originalPrice = basePrice * months;
  const discount =
    months > 1
      ? Math.round((1 - totalPrice / (basePrice * 2 * months)) * 100)
      : 0;

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="p-6 mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <form action={formAction} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Subscribe to {planTitle}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground mt-2">
              Choose your subscription duration and payment method
            </DialogDescription>
          </DialogHeader>

          {/* Duration Selector */}
          <div className="space-y-3">
            <Label className="text-sm font-medium mb-2 block">
              Subscription Duration
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { value: 1, label: `1 Month (₹${basePrice * 2}/month)` },
                { value: 3, label: `3 Months (₹${basePrice + 30}/month)` },
                { value: 6, label: `6 Months (₹${basePrice + 20}/month)` },
                { value: 12, label: `12 Months (₹${basePrice}/month)` },
              ].map((option) => (
                <div
                  key={option.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${months === option.value ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                  onClick={() => setMonths(option.value)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="month"
                      value={option.value}
                      checked={months === option.value}
                      onChange={() => setMonths(option.value)}
                      className="h-4 w-4 text-primary"
                    />
                    <span className="text-lg">{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-secondary p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subscription Total:</span>
              <div className="text-right">
                {months > 1 && (
                  <span className="text-muted-foreground line-through mr-2">
                    ₹{basePrice * 2 * months}
                  </span>
                )}
                <span className="text-xl font-bold">₹{totalPrice}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-muted-foreground">Monthly Rate:</span>
              <span className="font-medium">₹{adjustedPrice}/month</span>
            </div>
            {discount > 0 && (
              <div className="mt-2 text-green-600 dark:text-green-400 text-sm font-medium text-right">
                Save {discount}% on monthly price
              </div>
            )}
          </div>

          {/* Mobile Input */}
          {/*
          <div>
            <Label htmlFor="mobile" className="text-sm font-medium mb-2 block">
              Mobile Phone
            </Label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="+91"
              required
              pattern="^[6-9][0-9]{9}$"
              maxLength={10}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Indian mobile numbers only
            </p>
          </div>
 */}
          <input type="hidden" name="plan" value={plan} />
          <input type="hidden" name="amount" value={totalPrice.toString()} />
          <input type="hidden" name="paymentMethod" value={selectedMethod} />

          {/* Payment Methods */}
          <div className="space-y-3">
            <Label className="text-sm font-medium mb-2 block">
              Payment Method
            </Label>
            {[
              { id: "phonepe", name: "PhonePe", icon: "phonepe-icon.svg" },
              // { id: "googlepay", name: "Google Pay", icon: "gpay-icon.svg" },
              // { id: "paytm", name: "Paytm", icon: "paytm-icon.svg" },
            ].map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedMethod(method.id as PaymentOptions)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={method.id}
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() =>
                      setSelectedMethod(method.id as PaymentOptions)
                    }
                    className="h-4 w-4 text-primary"
                  />
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={`https://static.20032003.xyz/1as/${method.icon}`}
                        alt={`${method.name} Logo`}
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className="text-lg font-medium">{method.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link href="/tos" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and understand that my credit balance will be used for this
              subscription
            </label>
          </div>

          {/* Submit Button */}
          <GlowButton
            disabled={isPending || !agreedToTerms}
            type="submit"
            glowVariant="premium"
            className="w-full py-6 text-lg font-medium transition-all hover:shadow-md"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay Now with ${selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)}`
            )}
          </GlowButton>

          {paymentData?.error && (
            <p className="text-destructive text-sm text-center">
              {paymentData.error}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
