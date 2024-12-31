import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Facebook } from "lucide-react";

function ContactUs() {
  return (
    <main className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
      <Separator className="my-4" />

      <div className="max-w-2xl mx-auto space-y-8">
        <p className="text-lg text-center">
          We're here to help! Reach out to us through any of the following channels:
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center p-6 space-x-4">
              <Mail className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <a href="mailto:support@1as.in" className="text-blue-500 hover:underline">
                  support@1as.in
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6 space-x-4">
              <Facebook className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold mb-2">Facebook</h3>
                <a
                  href="https://facebook.com/1aliasservice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  1 Alias Service
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-gray-600 mt-8">
          We typically respond to all inquiries within 24 hours during business days.
        </p>
      </div>
    </main>
  );
}

export default ContactUs;
