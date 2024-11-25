import { Separator } from "@/components/ui/separator";
import AnimatedHero from "@/components/AnimatedHero";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  return (
    <main className="form_wrapper">
      <div className="opacity-100">
        <AnimatedHero gr="One Alias Account" />
      </div>
      <Separator className="w-1/2" />
      <div className="opacity-100">
        <LoginForm />
      </div>
    </main>
  );
}
