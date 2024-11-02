import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Shield, Mail, ArrowRight } from "lucide-react";
import AnimatedHero from "@/components/AnimatedHero";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <AnimatedHero gr="One Alias Service" />
      <Separator className="my-8" />

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Protect Your Privacy with Custom Email Aliases
        </h2>
        <p className="text-xl mb-6">
          Create unique email aliases that forward to your personal address,
          maintaining your privacy and control over your inbox.
        </p>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Simple and effective email management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Example:</p>
            <div className=" p-4 rounded-md">
              <code>potato@1as.in</code> <ArrowRight className="inline mx-2" />{" "}
              <code>you@gmail.com</code>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2" /> Privacy First
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We prioritize your privacy. Your personal email remains hidden,
              and you have full control over your aliases.
            </p>
          </CardContent>
          <CardFooter className="gap-1">
            <Link href="/legal/privacy">
              <Button variant="outline">Privacy Policy</Button>
            </Link>
            <Link href="/legal/tos">
              <Button variant="outline">Terms of Service</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2" /> Easy Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Create, edit, or delete aliases at any time. Our intuitive
              dashboard puts you in control.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/user/dash">
              <Button
                variant="secondary"
                className="border-2 border-transparent animate-border-glow"
              >
                Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      <section className="text-center mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Ready to Take Control of Your Inbox?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4  items-center">
              <Link href="/signup">
                <Button className="bg-green-500 hover:bg-green-700">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-blue-500 hover:bg-blue-700">
                  Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
