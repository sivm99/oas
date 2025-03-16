import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PricingCard from "@/components/PricingCard";
import AnimatedHero from "@/components/AnimatedHero";
import PaymentModal from "./PaymentModel";
import { User } from "@/Helper/types";

const PLANS = {
  star: {
    title: "Star ⭐️ 🌟",
    price: "49",
    currency: "₹",
    features: [
      {
        text: "1 Destination Address",
        description:
          "Main email address where all your aliases will forward to",
      },
      {
        text: "20 Email Aliases",
        description:
          "Create up to 20 different email aliases to protect your main email",
      },
      {
        text: "1,000 Email Forwarding/month",
        description:
          "Forward up to 1,000 emails per month through your aliases",
      },
      {
        text: "Sub 1-day Support",
        description: "Get support responses within 24 hours",
      },
      {
        text: "10 Premium Links (go.1as.in)",
        description:
          "Create 10 shortened links using our premium go.1as.in domain",
      },
    ],
    unavailableFeatures: [
      {
        text: "Multiple Destination Addresses",
        description: "Ability to forward to more than one main email address",
      },
      {
        text: "Custom Domain Shortlinks",
        description: "Use your own domain for shortened links",
      },
      {
        text: "Priority Support",
        description: "Get faster support response times",
      },
    ],
    plan: "star" as User["plan"],
  },
  galaxy: {
    title: "Galaxy 🌌 🌌",
    price: "79",
    currency: "₹",
    features: [
      {
        text: "Everything Included in the Star Plan",
        description: "All features from the Star plan plus more",
      },
      {
        text: "2 Destination Addresses",
        description:
          "Forward your aliases to two different main email addresses",
      },
      {
        text: "100 Email Aliases",
        description: "Create up to 100 different email aliases",
      },
      {
        text: "10,000 Email Forwarding/month",
        description:
          "Forward up to 10,000 emails per month through your aliases",
      },
      {
        text: "Priority Support",
        description: "Get faster support response times with priority queue",
      },
      {
        text: "100 Premium Links (go.1as.in/link and n3y.in/link)",
        description:
          "Create 100 shortened links using both our premium domains",
      },
      {
        text: "Custom Slugs - n3y.in/user/fb & n3y.in/user/ig ...",
        description: "Create custom URLs for your shortened links",
      },
    ],
    unavailableFeatures: [],
    plan: "galaxy" as User["plan"],
  },
  free: {
    title: "Free Tier 🚀",
    price: "0",
    currency: "₹",
    features: [
      {
        text: "1 Destination Address",
        description: "One main email address for forwarding",
      },
      {
        text: "5 Email Aliases",
        description: "Create up to 5 different email aliases",
      },
      {
        text: "100 Email Forwarding/month",
        description: "Forward up to 100 emails per month",
      },
      {
        text: "Community Support",
        description: "Get help through our community forums",
      },
      {
        text: "No Link Shortener",
        description: "Link shortening not available in free tier",
      },
    ],
    unavailableFeatures: [
      {
        text: "Premium Link Shortening",
        description: "Access to our premium link shortening domains",
      },
      {
        text: "Custom Slugs",
        description: "Ability to customize your shortened URLs",
      },
      {
        text: "Priority Support",
        description: "Faster support response times",
      },
    ],
    plan: "free" as User["plan"],
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PricingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const { plan } = resolvedSearchParams;
  const selectedPlan =
    plan && typeof plan === "string"
      ? PLANS[plan.toLowerCase() as keyof typeof PLANS]
      : null;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <AnimatedHero gr="One Alias Service Pricing" />
        <Separator className="w-1/2 mx-auto my-8" />
        <p className="text-xl text-gray-600">
          Choose the perfect plan for your email alias and link shortening needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <PricingCard
          {...PLANS.free}
          buttonText="Get Started"
          buttonVariant="outline"
          plan="free"
        />

        <PricingCard
          {...PLANS.star}
          buttonText="Explore Star"
          buttonVariant="outline"
          popular
          plan="star"
        />

        <PricingCard
          {...PLANS.galaxy}
          buttonText="Subscribe"
          buttonVariant="outline"
          plan="galaxy"
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
          <Button
            variant="outline"
            className="hover:bg-gray-100 transition-colors"
          >
            Contact Sales
          </Button>
        </Link>
      </div>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan.plan}
          price={selectedPlan.price}
          planTitle={selectedPlan.title}
          // currency={selectedPlan.currency}
        />
      )}
    </main>
  );
}
