import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PricingCard from "@/components/PricingCard";
import AnimatedHero from "@/components/AnimatedHero";
import PaymentModal from "./PaymentModel";
import PLANS from "./plans";

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
