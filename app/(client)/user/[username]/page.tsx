import { Suspense } from "react";
import { redirect } from "next/navigation";

import UserField from "./User/UserField";
import RuleFields from "./Rules/RuleField";
import DestinationField from "./Destinations/DestinationField";
import { Separator } from "@/components/ui/separator";

import { fetchDestinations, fetchRules, fetchUser } from "@/Helper/getData";

export const dynamic = "force-dynamic";
// export const fetchCache = 'no-store';

// Individual Loading Components
const UserFieldLoading = () => (
  <div className="dash_child animate-pulse">
    <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 bg-muted rounded w-full"></div>
      <div className="h-6 bg-muted rounded w-5/6"></div>
      <div className="h-6 bg-muted rounded w-2/3"></div>
    </div>
  </div>
);

const RulesFieldLoading = () => (
  <div className="dash_child animate-pulse">
    <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center space-x-3">
          <div className="h-6 bg-muted rounded w-6"></div>
          <div className="h-6 bg-muted rounded w-full"></div>
        </div>
      ))}
    </div>
  </div>
);

const DestinationFieldLoading = () => (
  <div className="dash_child animate-pulse">
    <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center space-x-3">
          <div className="h-6 bg-muted rounded w-6"></div>
          <div className="h-6 bg-muted rounded w-full"></div>
        </div>
      ))}
    </div>
  </div>
);

// Async Components with Suspense
const UserSection = async ({ username }: { username: string }) => {
  const { user } = await fetchUser();

  if (!user) redirect("/auth?success=true&provider=cb");
  if (username !== user.username) {
    redirect(`/user/${user.username}`);
  }

  return <UserField user={user} />;
};

const RulesSection = async () => {
  const { rules } = await fetchRules();
  const { destinations } = await fetchDestinations();

  return <RuleFields rules={rules} destinations={destinations} />;
};

const DestinationSection = async () => {
  const { destinations } = await fetchDestinations();
  const { user } = await fetchUser();

  return <DestinationField destinations={destinations} user={user} />;
};

// Main Dashboard Component
export default async function DashBoard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return (
    <main className="dash_wrapper">
      <div className="dash_child">
        <Suspense fallback={<UserFieldLoading />}>
          <UserSection username={username} />
        </Suspense>
      </div>

      <div>
        <Separator className="w-1/2" />
      </div>

      <div className="dash_child">
        <Suspense fallback={<RulesFieldLoading />}>
          <RulesSection />
        </Suspense>
      </div>

      <div>
        <Separator className="w-1/2" />
      </div>

      <div className="dash_child">
        <Suspense fallback={<DestinationFieldLoading />}>
          <DestinationSection />
        </Suspense>
      </div>
    </main>
  );
}
