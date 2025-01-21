import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

function RefundPolicy() {
  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">रिफंड नीति</h1>
      <Separator className="my-4" />
      <p className="mb-4">
        वन एलियास सर्विस में, हम चाहते हैं कि आप अपनी खरीदारी से पूरी तरह संतुष्ट हों। हम एक सरल और स्पष्ट रिफंड नीति प्रदान करते हैं:
      </p>
      <ol className="list-decimal marker:font-semibold marker:text-xl space-y-6 mt-6">
        <li>
          <h2 className="mb-2 font-semibold text-xl">रिफंड पात्रता</h2>
          <p className="mb-4">रिफंड खरीदारी के सात (7) दिनों के भीतर उपलब्ध हैं।</p>
        </li>
        <li>
          <h2 className="mb-2 font-semibold text-xl">रिफंड कैसे अनुरोध करें</h2>
          <p className="mb-4">रिफंड शुरू करने के लिए, बस हमारी सहायता टीम से संपर्क करें।</p>
        </li>
        <li>
          <h2 className="mb-2 font-semibold text-xl">रिफंड प्रक्रिया</h2>
          <p className="mb-4">कोई सवाल नहीं - हम सभी वैध रिफंड अनुरोधों को संसाधित करते हैं। रिफंड को 5-7 कार्य दिवसों के भीतर मूल भुगतान विधि में प्रोसेस और क्रेडिट किया जाएगा।</p>
        </li>
      </ol>

      <div className="flex flex-col items-center gap-4 mt-6">
        <p className="text-center">
          रिफंड अनुरोध करने के लिए, कृपया हमसे संपर्क करें:
          <br />
          <a href="mailto:support@1as.in" className="text-blue-500 hover:underline">
            support@1as.in
          </a>
        </p>

        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline" className="border-2 border-transparent">
              <ArrowLeft className="mr-2" /> घर पर वापस जाएं
            </Button>
          </Link>
          <Link href="mailto:support@1as.in">
            <Button variant="outline">
              <Mail className="mr-2" /> सहायता से संपर्क करें
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <p className="text-center text-gray-500 mt-6">
        अंतिम अपडेट: अक्टूबर 2024
      </p>
    </div>
  );
}

export default RefundPolicy;
