import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Home } from "lucide-react";
import Link from "next/link";

function PrivacyPolicy() {
  return (
    <main className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      <Separator className="my-4" />
      <p className="mb-4">
        At One Alias Service, we value the privacy of our users and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and protect your information when you visit or use our website hosting services.
      </p>
      <p className="mb-4">
        By accessing or using our website and services, you agree to the collection and use of information in accordance with this policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We collect two types of information:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>
          <strong>Personal Information:</strong> This includes details you provide when creating an account, purchasing hosting services, or contacting us, such as your name, email address, billing information, and any other details you provide.
        </li>
        <li>
          <strong>Usage Data:</strong> We collect information on how our services are accessed and used, such as your IP address, browser type, device type, usage statistics, and the time and date of your visits.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use the information we collect for the following purposes:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>To provide and manage your hosting services.</li>
        <li>To process transactions and billing.</li>
        <li>To improve our website, services, and customer support.</li>
        <li>
          To send you important updates, newsletters, and marketing communications (you may opt out of these at any time).
        </li>
        <li>To comply with legal obligations and enforce our terms and conditions.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Protect Your Information</h2>
      <p className="mb-4">
        We implement a variety of security measures to ensure the protection of your personal information. These measures include encryption, secure servers, and access controls. However, no method of data transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell, rent, or trade your personal information to third parties. We may share your information in the following cases:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>
          With trusted third-party service providers who assist us in operating our website and providing services to you (e.g., payment processors, email providers).
        </li>
        <li>
          When required by law or to comply with legal processes, such as responding to subpoenas or court orders.
        </li>
        <li>
          In the event of a merger, acquisition, or sale of our business, your information may be transferred to the new owners.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies and Tracking Technologies</h2>
      <p className="mb-4">
        We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us remember your preferences, analyze website traffic, and improve the functionality of our services. You can manage your cookie preferences through your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights</h2>
      <p className="mb-4">
        Depending on your location, you may have the right to:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>Access, update, or delete your personal information.</li>
        <li>Object to or restrict the processing of your personal information.</li>
        <li>Withdraw consent where we rely on consent to process your data.</li>
        <li>Lodge a complaint with a data protection authority.</li>
      </ul>
      <p className="mb-4">
        To exercise these rights, please contact us using the information provided below.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Data Retention</h2>
      <p className="mb-4">
        We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this Privacy Policy periodically.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your rights regarding your personal information, please contact us at:
      </p>
      <address className="mb-4">
        One Alias Service<br />
        Phagwara, Punjab, India<br />
        <a href="mailto:support@1as.in" className="text-blue-500">support@1as.in</a>
      </address>

      <div className="flex w-fit gap-2 m-2">
        <Link href="/">
          <Button>
            <Home className="mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/legal/tos">
          <Button>
            <FileText className="mr-2" />
            Read Terms of Service
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <p className="text-center text-gray-500 mt-6">Last updated: January 2025</p>
    </main>
  );
}

export default PrivacyPolicy;
