import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import FormBelow from "@/components/FormBelow";

export default async function LoginForm() {
  return (
    <Card className="form_card_container">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>One Alias Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="form_container" action="/api/login" method="post">
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
            autoComplete="current-password"
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
  );
}
