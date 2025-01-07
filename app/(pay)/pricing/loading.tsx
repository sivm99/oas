import AnimatedHero from "@/components/AnimatedHero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
function LoadingPricingCard() {
  return (
    <main className="form_wrapper">
      <div className="opacity-100">
        <AnimatedHero gr="One Alias Service Pricing" />
      </div>
      <Separator className="w-1/2 mx-auto my-8" />
      <div className="text-xl text-center text-gray-600 mb-8">
        Choose the perfect plan for your email alias and link shortening needs
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">
              <Skeleton className="h-8 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <Skeleton className="h-10 w-40 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-4 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              <Skeleton className="h-8 w-40" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-24" />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <Skeleton className="h-10 w-40 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-4 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">
              <Skeleton className="h-8 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <Skeleton className="h-10 w-40 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-4 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
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
    </main>
  );
}

export default LoadingPricingCard;
