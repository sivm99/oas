import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import AnimatedHero from "@/components/AnimatedHero";
import FormInput from "@/components/FormInput";
import FormBelow from "@/components/FormBelow";

async function handleLogin(formData: FormData) {
  "use server";
  // Add your server-side login logic here
  const email = formData.get("email");
  const password = formData.get("password");

  // Handle authentication
  console.log(email, password);
}

export default function Login() {
  return (
    <main className="form_wrapper">
      <div className="opacity-100">
        <AnimatedHero gr="One Alias Account" />
      </div>
      <Separator className="w-1/2" />
      <div className="opacity-100">
        <Card className="form_card_container">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>One Alias Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="form_container" action={handleLogin}>
              <FormInput
                name="email"
                type="email"
                label="Email Address"
                required
                placeholder="your@email.com"
                maxLength={64}
              />
              <FormInput
                name="password"
                type="password"
                label="Password"
                required
                placeholder="Enter your password"
                minLength={8}
                maxLength={16}
              />
              <Button type="submit">Login</Button>
            </form>
            <FormBelow forgetPassword />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
