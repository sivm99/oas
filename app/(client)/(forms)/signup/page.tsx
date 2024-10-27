import { Separator } from "@/components/ui/separator";
import AnimatedHero from "@/components/AnimatedHero";

import SignupForm from "./SignupForm";

export default async function Signup() {
  return (
    <main className="form_wrapper">
      <div className="opacity-100">
        <AnimatedHero gr="Create One Alias Account" />
      </div>
      <Separator className="w-1/2" />
      <div className="opacity-100">
        <SignupForm />
      </div>
    </main>
  );
}
