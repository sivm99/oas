import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

type PricingCardProps = {
  title: string;
  price: string;
  currency: string;
  features: string[];
  unavailableFeatures: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  popular?: boolean;
  plan: string;
};

export default async function PricingCard({
  title,
  price,
  currency,
  features,
  unavailableFeatures,
  buttonText,
  buttonVariant,
  popular = false,
  plan,
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col ${popular ? "border-primary shadow-lg" : ""}`}
    >
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {popular && (
          <CardDescription className="text-primary font-semibold">
            Most Popular
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-4xl font-bold mb-4">
          {currency} {price}
          <span className="text-xl font-normal">/month</span>
        </div>
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        {unavailableFeatures.length > 0 && (
          <ul className="space-y-2">
            {unavailableFeatures.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-400">
                <X className="mr-2 h-4 w-4" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={buttonVariant} asChild>
          <a href={price === "0" ? "/signup" : `/pricing?plan=${plan}`}>
            {buttonText}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
