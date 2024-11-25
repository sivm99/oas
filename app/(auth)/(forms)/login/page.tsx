import { Separator } from "@/components/ui/separator";
import AnimatedHero from "@/components/AnimatedHero";
import LoginForm from "./LoginForm";
// import { fetchUser } from "@/Helper/getData";
// import { redirect } from "next/navigation";

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
