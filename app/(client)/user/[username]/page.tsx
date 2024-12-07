import { redirect } from "next/navigation";

import { fetchUser } from "@/Helper/getData";

export const dynamic = "force-dynamic";

// Main Dashboard Component
export default async function DashBoard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { user } = await fetchUser();

  if (!user) redirect("/auth?success=true&provider=cb");
  if (username !== user.username) {
    redirect(`/user/${user.username}`);
  }
  return " ";
}
