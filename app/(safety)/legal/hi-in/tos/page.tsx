import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, Trash2 } from "lucide-react";
import Link from "next/link";

function TermsOfService() {
  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">सेवा की शर्तें</h1>
      <Separator className="my-4" />

      <ol className="list-decimal marker:font-semibold marker:text-xl space-y-6 mt-6">
        <li>
          <h2 className="text-xl font-semibold mb-2">शर्तों की स्वीकृति</h2>
          <p>
            हमारी सेवाओं का उपयोग करके, आप इन सेवा की शर्तों का पालन करने और उनके द्वारा बंधे रहने के लिए सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold mb-2">सेवाओं का अवलोकन</h2>
          <p>
            हमारी सेवाएँ भारत में होस्ट की गई हैं और ईमेल को क्लाउडफ्लेयर के माध्यम से रूट करने के लिए डिज़ाइन की गई हैं। हमारी सेवा का उपयोग करके, आप क्लाउडफ्लेयर की गोपनीयता नीति का पालन करने के लिए भी सहमत होते हैं।
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold mb-2">डेटा संग्रहण और गोपनीयता</h2>
          <p>
            हम आपकी डेटा को केवल रूटिंग जानकारी के लिए एकत्र करते हैं जो हमारी सेवाओं को प्रदान करने के लिए आवश्यक है। आपके पास किसी भी समय अपने डेटा को हटाने का अधिकार है, निर्देशों का पालन करके।
          </p>
          <div className="flex w-fit gap-2 m-2">
            <Link href="/legal/hi-in/privacy">
              <Button>
                <FileText name="file-text" className="mr-2" />
                गोपनीयता नीति पढ़ें
              </Button>
            </Link>
            <Link href="/delete-me">
              <Button className="bg-red-400 hover:bg-red-700">
                <Trash2 name="file-text" className="mr-2" />
                मेरा डेटा हटाएं
              </Button>
            </Link>
          </div>
        </li>

        <li>
          <h2 className="text-xl font-semibold mb-2">रिफंड नीति</h2>
          <p>
            रिफंड हमारी वेबसाइट की रिफंड नीति के अनुसार संसाधित किया जाएगा, यहाँ रिफंड नीति के बारे में पढ़ें <Link href="/legal/hi-in/refund">
              <Button>
                <span className="font-bold text-2xl">₹</span>रिफंड नीति</Button>
            </Link>
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold mb-2">शासन कानून</h2>
          <p>
            ये शर्तें भारत के कानूनों के अनुसार शासित और व्याख्यायित की जाएंगी, इसके संघर्ष के कानून के सिद्धांतों की परवाह किए बिना। इन शर्तों से उत्पन्न या संबंधित किसी भी विवाद का निपटारा भारत में स्थित अदालतों के विशेष अधिकार क्षेत्र के अधीन होगा।
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold mb-2">शर्तों में संशोधन</h2>
          <p>
            हम इन सेवा की शर्तों को किसी भी समय संशोधित करने का अधिकार सुरक्षित रखते हैं। कोई भी परिवर्तन इस पृष्ठ पर पोस्ट किया जाएगा, और आपकी सेवा का निरंतर उपयोग ऐसे संशोधनों की स्वीकृति का गठन करता है।
          </p>
        </li>

        <li>
          <h2 className="text-xl font-semibold mb-2">हमसे संपर्क करें</h2>
          <p>
            यदि आपके पास हमारे उत्पाद, गोपनीयता नीति, रिफंड नीति और/या सेवा की शर्तों के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें <Link href="/contact">
              <Button className="mr-2">
                <span className="font-bold text-2xl"><Mail size={20} /></span>संपर्क पृष्ठ </Button>
            </Link>
          </p>
        </li>
      </ol>

      <Separator className="my-4" />
      <p className="text-center text-gray-500 mt-6">
        अंतिम अपडेट: अक्टूबर 2024
      </p>
    </div>
  );
}

export default TermsOfService;
