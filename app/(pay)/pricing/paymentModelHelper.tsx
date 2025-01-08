import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// Types
export type PaymentMethod = {
  id: string;
  name: string;
  logoUrl: string;
  logoClassName?: string;
};

export type PaymentMethodProps = {
  method: PaymentMethod;
  selected: string;
};

export type PaymentMethodsProps = {
  selectedMethod: string;
  onMethodChange: (value: string) => void;
};

export type PaymentDetailsProps = {
  plan: string;
  price: string;
  currency: string;
};

export type PayUFormData = {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
};

export type ActionState = {
  payuData?: PayUFormData;
  error?: string;
};

// Payment method options
const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "payu",
    name: "PayU",
    logoUrl: "https://static.20032003.xyz/1as/payu/payu-logo-green.svg",
    logoClassName: "dark:bg-white",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    logoUrl: "https://static.20032003.xyz/1as/phonepe-icon.svg",
  },
];

// Individual Payment Method Component
export const PaymentMethodOption = ({
  method,
  // selected,
}: PaymentMethodProps) => (
  <Label
    htmlFor={method.id}
    className="grid grid-cols-[auto_1fr] items-center gap-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
  >
    <RadioGroupItem value={method.id} id={method.id} />
    <div className="grid grid-cols-[auto_1fr] items-center gap-3">
      <Image
        src={method.logoUrl}
        alt={`${method.name} Logo`}
        className={`w-8 h-8 md:w-10 md:h-10 ${method.logoClassName || ""}`}
        width={40}
        height={40}
      />
      <span className="text-base md:text-lg font-medium">{method.name}</span>
    </div>
  </Label>
);

// Payment Methods Group Component
export const PaymentMethods = ({
  selectedMethod,
  onMethodChange,
}: PaymentMethodsProps) => (
  <RadioGroup
    value={selectedMethod}
    onValueChange={onMethodChange}
    className="grid grid-cols-1 md:grid-cols-2 gap-3"
  >
    {PAYMENT_METHODS.map((method) => (
      <PaymentMethodOption
        key={method.id}
        method={method}
        selected={selectedMethod}
      />
    ))}
  </RadioGroup>
);

// Mobile Input Component
export const MobileInput = () => (
  <FormInput
    type="tel"
    name="mobile"
    label="Mobile Phone"
    required
    error="Indian Mobile Only"
    placeholder=" +91"
    maxLength={10}
    pattern="^[6-9][0-9]{9}$"
  />
);

// Payment Details Component
export const PaymentDetails = ({
  plan,
  price,
  currency,
}: PaymentDetailsProps) => (
  <>
    <DialogHeader className="mb-4 md:mb-6">
      <DialogTitle className="text-xl md:text-2xl font-semibold">
        Subscribe to {plan}
      </DialogTitle>
      <DialogDescription className="text-sm md:text-base text-muted-foreground mt-2">
        Choose your payment method to complete the subscription.
      </DialogDescription>
    </DialogHeader>
    <p className="text-lg md:text-xl font-medium">
      Total: {currency} {price}/month
    </p>
  </>
);
