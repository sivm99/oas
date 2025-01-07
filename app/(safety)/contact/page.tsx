import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Phone, User, Building, MapPin } from "lucide-react";

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
                  href="mailto:shivam@1as.in"
                  className="text-blue-500 hover:underline"
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
                  href="mailto:support@1as.in"
                  className="text-blue-500 hover:underline"
                >
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
                  href="https://www.facebook.com/profile.php?id=61571418251117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
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

          <Card>
            <CardContent className="flex items-center p-6 space-x-4">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <address className="text-gray-600 not-italic">
                  Mehli Gate, Phagwara,
                  <br />
                  Punjab, India 144401
                </address>
              </div>
            </CardContent>
          </Card>
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
