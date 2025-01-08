import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type PaymentState = {
  error: {
    message: string;
    txnid: string;
    plan: string;
    mobile: string;
    provider: string;
    subid: string;
  } | null;
  success: {
    message: string;
    txnid: string;
    plan: string;
    mobile: string;
    provider: string;
    subid: string;
  } | null;
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper = ({ children }: CardWrapperProps) => (
  <main className="dash_wrapper">
    <section className="dash_child">{children}</section>
  </main>
);

const createPaymentState = (
  success: string,
  message: string,
  txnid: string,
  plan: string,
  mobile: string,
  provider: string,
  subid: string,
): PaymentState => {
  const isSuccess = success === "true";
  const stateData = { message, txnid, plan, mobile, provider, subid };

  return {
    success: isSuccess ? stateData : null,
    error: isSuccess ? null : stateData,
  };
};

export default async function PaymentCallback({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    success = "false",
    message = "Payment Processing Failed",
    txnid = "",
    plan = "",
    mobile = "",
    provider = "",
    subid = "",
  } = await searchParams;

  const paymentState = createPaymentState(
    success as string,
    message as string,
    txnid as string,
    plan as string,
    mobile as string,
    provider as string,
    subid as string,
  );

  if (paymentState.success) {
    return (
      <CardWrapper>
        <SuccessCard
          message={paymentState.success.message}
          txnid={paymentState.success.txnid}
          plan={paymentState.success.plan}
          mobile={paymentState.success.mobile}
          provider={paymentState.success.provider}
          subid={paymentState.success.subid}
        />
      </CardWrapper>
    );
  }

  if (paymentState.error) {
    return (
      <CardWrapper>
        <ErrorCard
          message={paymentState.error.message}
          txnid={paymentState.error.txnid}
          plan={paymentState.error.plan}
          mobile={paymentState.error.mobile}
          provider={paymentState.error.provider}
          subid={paymentState.error.subid}
        />
      </CardWrapper>
    );
  }
}

function SuccessCard({
  message,
  txnid,
  plan,
  mobile,
  provider,
  subid,
}: {
  message: string;
  txnid: string;
  plan: string;
  mobile: string;
  provider: string;
  subid: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex justify-center">
        <CheckCircle2 className="h-24 w-24 text-green-500 md:h-32 md:w-32" />
      </div>

      <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-7xl font-bold text-green-500">
          Payment Successful!
        </CardTitle>
        <CardDescription className="text-xl md:text-5xl mt-2 text-start">
          {message}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2 mt-4 text-lg">
          <p>Transaction ID: {txnid}</p>
          <p>Plan: {plan}</p>
          <p>Mobile: {mobile}</p>
          <p>Provider: {provider}</p>
          <p>Sub ID: {subid}</p>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            variant="default"
            className="w-full sm:w-auto min-w-[140px]"
            asChild
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ErrorCard({
  message,
  txnid,
  plan,
  mobile,
  provider,
  subid,
}: {
  message: string;
  txnid: string;
  plan: string;
  mobile: string;
  provider: string;
  subid: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex justify-center">
        <AlertCircle className="h-24 w-24 text-red-500 md:h-32 md:w-32" />
      </div>

      <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-7xl font-bold text-red-500">
          Payment Failed
        </CardTitle>
        <CardDescription className="text-xl md:text-5xl mt-2 text-start">
          {message}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2 mt-4 text-lg">
          {txnid && <p>Transaction ID: {txnid}</p>}
          <p>Plan: {plan}</p>
          <p>Mobile: {mobile}</p>
          <p>Provider: {provider}</p>
          <p>Sub ID: {subid}</p>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            variant="default"
            className="w-full sm:w-auto min-w-[140px]"
            asChild
          >
            <Link href="/pricing">Try Again</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
