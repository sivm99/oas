import AnimatedHero from "@/components/animated-hero";
import { Separator } from "@/components/ui/separator";
import LoginForm from "./login-form";


export default async function LoginPage() {
  // const { user } = await fetchUser();
  // if (user) {
  //   redirect(`/user/${user.username}`);
  // }
  // this was making it dynamic thats why cancelled it
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
