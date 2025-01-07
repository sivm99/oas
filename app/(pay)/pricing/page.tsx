import PricingCard from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import PaymentModal from "./PaymentModel";
import { Separator } from "@/components/ui/separator";
import AnimatedHero from "@/components/AnimatedHero";
import Link from "next/link";

const PLANS = {
  star: {
    title: "Star",
    price: "49",
    currency: "INR",
  },
  galaxy: {
    title: "Galaxy",
    price: "79",
    currency: "INR",
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PricingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await Promise.resolve(searchParams);
  const { plan } = params;
  const selectedPlan =
    plan && typeof plan === "string"
      ? PLANS[plan.toLowerCase() as keyof typeof PLANS]
      : null;
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <main className="form_wrapper">
      <div className="opacity-100">
        <AnimatedHero gr="One Alias Service Pricing" />
      </div>
      <Separator className="w-1/2 mx-auto my-8" />
      <p className="text-xl text-center text-gray-600 mb-8">
        Choose the perfect plan for your email alias and link shortening needs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <PricingCard
          title="Free Tier 🚀"
          price="0"
          currency="INR"
          features={[
            "1 Destination Address",
            "5 Email Aliases",
            "100 Email Forwarding/month",
            "Community Support",
            "No Link Shortener",
          ]}
          unavailableFeatures={[
            "Premium Link Shortening",
            "Custom Slugs",
            "Priority Support",
          ]}
          buttonText="Get Started"
          buttonVariant="outline"
          plan="free"
        />
        <PricingCard
          plan="star"
          title="Star ⭐️ 🌟"
          price="49"
          currency="INR"
          features={[
            "1 Destination Address",
            "20 Email Aliases",
            "1,000 Email Forwarding/month",
            "Sub 1-day Support",
            "10 Premium Links (go.1as.in)",
          ]}
          unavailableFeatures={[
            "Multiple Destination Addresses",
            "Custom Domain Shortlinks",
            "Priority Support",
          ]}
          buttonText="Subscribe"
          buttonVariant="default"
          popular
        />
        <PricingCard
          plan="galaxy"
          title="Galaxy 🌌 🌌"
          price="79"
          currency="INR"
          features={[
            "2 Destination Addresses",
            "100 Email Aliases",
            "10,000 Email Forwarding/month",
            "Priority Support",
            "100 Premium Links (go.1as.in/link and n3y.in/link)",
            "Custom Slugs",
          ]}
          unavailableFeatures={[]}
          buttonText="Subscribe"
          buttonVariant="default"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Not sure which plan is right for you?
        </h2>
        <p className="text-gray-600 mb-6">
          Contact our sales team for a personalized recommendation
        </p>
        <Link href="/contact">
          <Button variant="outline">Contact Sales</Button>
        </Link>
      </div>
      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan.title}
          price={selectedPlan.price}
          currency={selectedPlan.currency}
        />
      )}
    </main>
  );
}
