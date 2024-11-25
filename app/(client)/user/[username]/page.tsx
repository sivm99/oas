import UserField from "./User/UserField";
import RuleFields from "./Rules/RuleField";
import DestinationField from "./Destinations/DestinationField";
import { Separator } from "@/components/ui/separator";
import { fetchDestinations, fetchRules, fetchUser } from "@/Helper/getData";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

type Params = Promise<{ username: string }>;
async function DashBoard({ params }: { params: Params }) {
  const [{ user }, { rules }, { destinations }, { username }] =
    await Promise.all([fetchUser(), fetchRules(), fetchDestinations(), params]);
  if (!user) redirect("/auth?success=true&provider=cb");
  if (username !== user.username) {
    redirect(`/user/${user.username}`);
  }

  return (
    <>
      <main className="dash_wrapper">
        <div className="dash_child">
          <UserField user={user} />
        </div>
        <div>
          <Separator className="w-1/2" />
        </div>
        <div className="dash_child">
          <RuleFields rules={rules} destinations={destinations} />
        </div>
        <div>
          <Separator className="w-1/2" />
        </div>
        <div className="dash_child">
          <DestinationField destinations={destinations} user={user} />
        </div>
      </main>
    </>
  );
}

export default DashBoard;
