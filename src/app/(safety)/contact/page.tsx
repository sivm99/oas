import { Building, Phone, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function ContactUs() {
  return (
    <main className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
      <Separator className="my-4" />

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Managed By Shivam Shukla</h2>
          {/* <p className="text-gray-600">Founder & CEO, 1 Alias Service</p> */}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center p-6 space-x-4">
              <User className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold mb-2">Personal Email</h3>
                <a
                  className="text-blue-500 hover:underline"
                  href="mailto:shivam@1as.in"
                >
                  shivam@1as.in
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6 space-x-4">
              <Building className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold mb-2">Company Support</h3>
                <a
                  className="text-blue-500 hover:underline"
                  href="mailto:support@1as.in"
                >
                  support@1as.in
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6 space-x-4">
              <svg
                className="text-blue-600"
                fill="none"
                height="45"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                width="45"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Facebook icon</title>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <div>
                <h3 className="font-semibold mb-2">Facebook</h3>
                <a
                  className="text-blue-500 hover:underline"
                  href="https://www.facebook.com/profile.php?id=61571418251117"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  1 Alias Service
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6 space-x-4">
              <Phone className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <p>+91 182 429 1351</p>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="flex items-center p-6 space-x-4">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <address className="text-gray-600 not-italic">
                  Phagwara,
                  <br />
                  Punjab, India 144401
                </address>
              </div>
            </CardContent>
          </Card> */}
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            We typically respond to all inquiries within 24 hours during
            business days.
          </p>
          <p className="text-sm text-gray-500">
            1 Alias Service - Your Trusted Partner in Digital Solutions
          </p>
        </div>
      </div>
    </main>
  );
}

export default ContactUs;
