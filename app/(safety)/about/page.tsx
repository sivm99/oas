import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

function AboutUs() {
  return (
    <main className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
      <Separator className="my-4" />

      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-lg">
          Welcome to 1AS (One Alias Service), your trusted partner in email privacy and management.
          We provide a seamless solution for creating and managing email aliases, helping you maintain
          control over your digital identity.
        </p>

        <p className="text-lg">
          Our service was born from a simple idea: everyone deserves privacy and control over their
          email communications. We've built a platform that makes it easy to create, manage, and
          monitor email aliases while keeping your real email address private.
        </p>

        <p className="text-lg">
          For any inquiries or assistance, please reach out to our admin at{" "}
          <a href="mailto:admin@1as.in" className="text-blue-500 hover:underline">
            admin@1as.in
          </a>
        </p>

        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="flex items-center justify-center p-6">
            <p className="text-lg font-medium flex items-center gap-2">
              Made with <Heart className="text-red-500 animate-pulse" size={24} /> in India
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default AboutUs;
