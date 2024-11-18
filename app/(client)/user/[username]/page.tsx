import UserField from "./User/UserField";
import RuleFields from "./Rules/RuleField";
import DestinationField from "./Destinations/DestinationField";
import { Separator } from "@/components/ui/separator";
import { fetchDestinations, fetchRules, fetchUser } from "@/Helper/getData";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
async function DashBoard() {
  const [{ user }, { rules }, { destinations }] = await Promise.all([
    fetchUser(),
    fetchRules(),
    fetchDestinations(),
  ]);
  if (!user) redirect("/login");

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
