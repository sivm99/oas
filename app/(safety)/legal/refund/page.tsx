import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

function RefundPolicy() {
  return (
    <main className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Refund Policy</h1>
      <Separator className="my-4" />
      <p className="mb-4">
        At One Alias Service, we want you to be completely satisfied with your purchase. We offer a simple and straightforward refund policy:
      </p>
      <ol className="list-decimal marker:font-semibold marker:text-xl space-y-6 mt-6">
        <li>
          <h2 className="mb-2 font-semibold text-xl">Refund Eligibility</h2>
          <p className="mb-4">Refunds are available within seven (7) days of purchase.</p>
        </li>
        <li>
          <h2 className="mb-2 font-semibold text-xl">How to Request a Refund</h2>
          <p className="mb-4">To initiate a refund, simply contact our support team.</p>
        </li>
        <li>
          <h2 className="mb-2 font-semibold text-xl">Refund Processing</h2>
          <p className="mb-4">No questions asked - we process all valid refund requests. Refunds will be processed and credited back to the original payment method within 5-7 business days.</p>
        </li>
      </ol>

      <div className="flex flex-col items-center gap-4 mt-6">
        <p className="text-center">
          To request a refund, please contact us at:
          <br />
          <a href="mailto:support@1as.in" className="text-blue-500 hover:underline">
            support@1as.in
          </a>
        </p>

        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline" className="border-2 border-transparent">
              <ArrowLeft className="mr-2" /> Go Back to Home
            </Button>
          </Link>
          <Link href="mailto:support@1as.in">
            <Button variant="outline">
              <Mail className="mr-2" /> Contact Support
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <p className="text-center text-gray-500 mt-6">
        Last updated: October 2024
      </p>
    </main>
  );
}

export default RefundPolicy;
