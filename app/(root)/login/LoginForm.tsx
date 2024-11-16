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
import { handleAuth } from "@/app/(client)/(forms)/actions";
import { redirect } from "next/navigation";
import { setAuthCookie } from "@/utils/authcb";
const HOST = process.env.HOST || "http://localhost:3000";
export default async function LoginForm() {
  return (
    <Card className="form_card_container">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>One Alias Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="form_container"
          action={async (f) => {
            "use server";
            const redirectUrl = new URL(`${HOST}/auth`);
            const r = await handleAuth(f);
            if (!r || !r.user || !r.cookie) {
              redirectUrl.searchParams.set("success", "false");
              redirectUrl.searchParams.set(
                "message",
                r.message || "Unknow Error",
              );
              redirectUrl.searchParams.set("provider", "Login");
              redirect(redirectUrl.toString());
            }
            await setAuthCookie({ name: "token", value: r.cookie });
            redirectUrl.searchParams.set("success", "true");
            redirectUrl.searchParams.set("message", "Login Successful");
            redirectUrl.searchParams.set("provider", "Login");
            redirect(redirectUrl.toString());
          }}
        >
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
