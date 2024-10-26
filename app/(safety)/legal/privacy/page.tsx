import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Home } from "lucide-react";
import Link from "next/link";

export function PrivacyPolicy() {
  return (
    <main className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      <Separator className="my-4" />
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p>
        We value your privacy and are committed to protecting your personal
        data. This privacy policy will inform you about how we handle your
        personal data when you visit our website.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Data Collection</h2>
      <p>
        We do not collect any unnecessary personal data. We use necessary login
        cookies solely for the purpose of managing credentials and app
        information. No IP addresses, device information, or any other data is
        stored with us.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Deletion</h2>
      <p>You can read instructions on how to delete your data on our</p>
      <a href="/delete-me" className="text-blue-500">
        Delete My Data
      </a>{" "}
      page.
      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Third-Party Services
      </h2>
      <p>
        We use Cloudflare&apos;s Email Routing service, and your destination
        address is stored with them. You can refer to Cloudflare&apos;s
      </p>
      <Link
        href="https://www.cloudflare.com/privacypolicy/"
        className="text-blue-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link
        href="https://www.cloudflare.com/terms/"
        className="text-blue-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms of Service
      </Link>{" "}
      for more information.
      <div className="flex w-fit gap-2 m-2">
        <Link href="/">
          <Button>
            <Home name="home" className="mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/legal/tos">
          <Button>
            <FileText name="file-text" className="mr-2" />
            Read Terms of Service
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <p className="text-center text-gray-500 mt-6">
        Last updated: October 2024
      </p>
    </main>
  );
}
export const runtime = "edge";
export const revalidate = false;
export const dynamic = "force-static";
export default PrivacyPolicy;
