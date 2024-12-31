import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, Trash2 } from "lucide-react";
import Link from "next/link";

function TermsOfService() {
  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Terms of Service</h1>
      <Separator className="my-4" />

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p>
        By accessing or using our services, you agree to comply with and be
        bound by these Terms of Service. If you do not agree to these terms,
        please do not use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Services Overview</h2>
      <p>
        Our services are hosted in India and are designed to route emails
        through Cloudflare. By using our service, you also agree to comply with
        the Cloudflare Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Data Collection and Privacy
      </h2>
      <p>
        We do not collect or store your data except for routing information
        necessary to provide our services. You have the right to delete your
        data at any time by following the instructions at
      </p>
      <div className="flex w-fit gap-2 m-2">
        <Link href="/legal/privacy">
          <Button>
            <FileText name="file-text" className="mr-2" />
            Read Privacy Policy
          </Button>
        </Link>
        <Link href="/delete-me">
          <Button className="bg-red-400 hover:bg-red-700">
            <Trash2 name="file-text" className="mr-2" />
            Delete My Data
          </Button>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Refund Policy</h2>
      <p>
        Refund shall be processed according to the refund policy of our website
        read abou the refund policy here <Link href="/legal/refund">
          <Button>
            <span className="font-bold text-2xl">₹</span>Refund Policy</Button>
        </Link>
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Governing Law</h2>
      <p>
        These terms shall be governed by and construed in accordance with the
        laws of India, without regard to its conflict of law principles. Any
        disputes arising out of or in connection with these terms shall be
        subject to the exclusive jurisdiction of the courts located in India.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Modifications to Terms
      </h2>
      <p>
        We reserve the right to modify these Terms of Service at any time. Any
        changes will be posted on this page, and your continued use of the
        service constitutes acceptance of such modifications.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions regarding our Product , Privacy Policy , Refund Policy and/or ToS please reach us <Link href="/contact">
          <Button className="mr-2">
            <span className="font-bold text-2xl"><Mail size={20} /></span>Contact page </Button>
        </Link>
      </p>
      <Separator className="my-4" />
      <p className="text-center text-gray-500 mt-6">
        Last updated: October 2024
      </p>
    </div>
  );
}

export default TermsOfService;
