"use client";
import React, { useActionState, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import paymentAction from "./actions";
import {
  MobileInput,
  PaymentDetails,
  PaymentDetailsProps,
  PaymentMethods,
  PaymentOptions,
} from "./paymentModelHelper";
import { Loader2 } from "lucide-react";

// Main Payment Modal Component
const PaymentModal = ({ plan, price, currency }: PaymentDetailsProps) => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentOptions>("phonepe");
  const [paymentData, formAction, isPending] = useActionState(
    paymentAction,
    null,
  );

  // Submit the PayU form if we got PayU data back
  useEffect(() => {
    if (paymentData?.payuData) {
      const form = document.getElementById("payuForm") as HTMLFormElement;
      if (form) form.submit();
    }
  }, [paymentData]);

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="p-4 md:p-6 mx-auto w-full max-w-md md:max-w-lg m-2 rounded-lg">
        <form action={formAction} className="grid grid-rows-auto gap-6">
          <PaymentDetails plan={plan} price={price} currency={currency} />
          <input type="hidden" name="plan" value={plan} />
          <input type="hidden" name="amount" value={price} />
          <input type="hidden" name="paymentMethod" value={selectedMethod} />

          <div className="grid grid-cols-1 gap-4">
            <MobileInput />
          </div>

          <PaymentMethods
            selectedMethod={selectedMethod}
            onMethodChange={setSelectedMethod}
          />

          <Button
            disabled={isPending}
            type="submit"
            className="w-full text-base md:text-lg py-6"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </Button>

          {paymentData?.error && (
            <p className="text-red-500 text-sm">{paymentData.error}</p>
          )}
        </form>

        {paymentData?.payuData && (
          <form
            id="payuForm"
            action="https://test.payu.in/_payment"
            method="post"
            className="hidden"
          >
            <input type="hidden" name="key" value={paymentData.payuData.key} />
            <input
              type="hidden"
              name="txnid"
              value={paymentData.payuData.txnid}
            />
            <input
              type="hidden"
              name="amount"
              value={paymentData.payuData.amount}
            />
            <input
              type="hidden"
              name="productinfo"
              value={paymentData.payuData.productinfo}
            />
            <input
              type="hidden"
              name="firstname"
              value={paymentData.payuData.firstname}
            />
            <input
              type="hidden"
              name="email"
              value={paymentData.payuData.email}
            />
            <input
              type="hidden"
              name="phone"
              value={paymentData.payuData.phone}
            />
            <input
              type="hidden"
              name="surl"
              value={paymentData.payuData.surl}
            />
            <input
              type="hidden"
              name="furl"
              value={paymentData.payuData.furl}
            />
            <input
              type="hidden"
              name="hash"
              value={paymentData.payuData.hash}
            />
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
