import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

interface PaymentModalProps {
  plan: string;
  price: string;
  currency: string;
}

export default async function PaymentModal({
  plan,
  price,
  currency,
}: PaymentModalProps) {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="p-4 md:p-6 mx-auto w-full max-w-md md:max-w-lg m-2 rounded-lg">
        <DialogHeader className="mb-4 md:mb-6">
          <DialogTitle className="text-xl md:text-2xl font-semibold">
            Subscribe to {plan}
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-muted-foreground mt-2">
            Choose your payment method to complete the subscription.
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (f: FormData) => {
            "use server";
            console.log(f);
          }}
          className="flex flex-col gap-6"
        >
          <p className="text-lg md:text-xl font-medium">
            Total: {currency} {price}/month
          </p>
          <RadioGroup
            defaultValue="phonepe"
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <Label
              htmlFor="phonepe"
              className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <RadioGroupItem value="phonepe" id="phonepe" />
              <div className="flex items-center gap-3">
                <Image
                  src="https://static.20032003.xyz/1as/phonepe-icon.svg"
                  alt="Phonepe Logo"
                  className="w-8 h-8 md:w-10 md:h-10"
                  width={40}
                  height={40}
                />
                <span className="text-base md:text-lg font-medium">
                  PhonePe
                </span>
              </div>
            </Label>
            <Label
              htmlFor="payu"
              className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <RadioGroupItem value="payu" id="payu" />
              <div className="flex items-center gap-3">
                <Image
                  src="https://static.20032003.xyz/1as/payu/payu-logo-green.svg"
                  alt="PayU Logo"
                  className="w-8 h-8 md:w-10 md:h-10 dark:bg-white"
                  width={40}
                  height={40}
                />
                <span className="text-base md:text-lg font-medium">PayU</span>
              </div>
            </Label>
          </RadioGroup>
          <Button type="submit" className="w-full text-base md:text-lg py-6">
            Pay Now
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
