import FormBelow from "@/components/form-below";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginAction } from "../actions";
export default async function LoginForm() {
  return (
    <Card className="form_card_container">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>One Alias Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginAction} className="form_container">
          <FormInput
            error="Valid Email Only"
            label="Email Address"
            maxLength={64}
            name="email"
            pattern="^[a-zA-Z0-9][\w\.\-]{0,40}@[a-zA-Z0-9\.\-]{1,18}\.[a-zA-Z]{2,6}$"
            placeholder="your@email.com"
            required
            type="email"
          />
          <FormInput
            autoComplete="current-password"
            label="Password"
            maxLength={16}
            minLength={8}
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
          <Button type="submit">Login</Button>
        </form>
        <FormBelow forgetPassword />
      </CardContent>
    </Card>
  );
}
