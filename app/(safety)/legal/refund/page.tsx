import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function RefundPolicy() {
  return (
    <main className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Refund Policy</h1>
      <Separator className="my-4" />

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-lg mb-4">
              At One Alias Service, we want you to be completely satisfied with your purchase. We offer a simple and
              straightforward refund policy:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>Refunds are available within seven (7) days of purchase</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>To initiate a refund, simply contact our support team</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>No questions asked - we process all valid refund requests</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span>Refunds will be processed and credited back to the original payment method with in 5-7 business days.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

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

      </div>
    </main>
  );
}

export default RefundPolicy;
