import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

function DeleteMe() {
  return (
    <main className="m-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Delete My Data</h1>
      <Separator className="my-4" />
      <h2 className="text-xl font-semibold mt-6 mb-2 text-center">
        We Will Miss You!
      </h2>
      <p>
        We understand that you may wish to leave us, and we respect your
        decision. We only have your email address stored with us, and all other
        information is non-identifiable, as they are custom alias email rules.
      </p>
      <p>
        If you still want to proceed with deleting your data, please write an
        email to us. We will delete your data within 2 business days and send
        you a confirmation email to your destination address saved with us.
        After that email, we will not retain any details related to you.
      </p>{" "}
      <a href="mailto:support@1as.in" className="text-blue-500">
        support@1as.in
      </a>
      <p className="font-semibold text-red-500">
        please note that all your email rules, their status (on/off), and any
        associated information will be permanently deleted, so ensure you have
        backed up any important configurations.
      </p>
      <div className="flex w-fit gap-2 m-2">
        <Link href="/">
          <Button
            variant={`outline`}
            className="border-2 border-transparent animate-border-glow"
          >
            <ArrowLeft className="mr-2" />
            Go Back to Home
          </Button>
        </Link>
        <Link href="mailto:support@1as.in">
          <Button variant={`outline`}>
            <Mail className="mr-2" />
            Contact Support
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <p className="text-center text-gray-500 mt-6">
        Thank you for being with us. We hope to see you again in the future.
      </p>
    </main>
  );
}

export default DeleteMe;
