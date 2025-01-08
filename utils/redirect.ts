import { redirect } from "next/navigation";

const HOST = process.env.HOST || "http://localhost:3000";

type RedirectParams = {
  path: string;
  success: boolean;
  message: string;
  provider: string;
  rt?: string;
};
/**
 * Helper function to handle redirects with search parameters
 * @param path - The path to redirect to (e.g., "auth")
 * @param success - Boolean indicating if the operation was successful
 * @param message - Message to display to the user
 * @param provider - Provider name (e.g., "Login", "Signup")
 * @param resetToken - Optional reset token for password reset in case of error
 */
export function rd({
  path,
  success,
  message,
  provider,
  rt,
}: RedirectParams): void {
  const redirectUrl = new URL(`${HOST}/${path}`);
  redirectUrl.searchParams.set("success", success.toString());
  redirectUrl.searchParams.set("message", message);
  redirectUrl.searchParams.set("provider", provider);
  if (rt) {
    redirectUrl.searchParams.set("rt", rt);
  }
  redirect(redirectUrl.toString());
}

/**
 * Simple redirect function that forwards to provided URL
 * @param url - The URL to redirect to
 */
export function rd2(url: string): void {
  redirect(url);
}
