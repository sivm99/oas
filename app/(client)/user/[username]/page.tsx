"use client";
import useAppContext from "@/hooks/useAppContext";
import { useActionState, useEffect } from "react";
// import { useParams } from "next/navigation";

import { fetchDestinations, fetchRules } from "@/Helper/getData";
import { Destination, Rule } from "@/Helper/types";
import {
  getLocalDestinations,
  getLocalRules,
  getLocalUser,
} from "@/Helper/getLocalData";
import UserField from "./User/UserField";
import RuleFields from "./Rules/RuleField";
import DestinationField from "./Destinations/DestinationField";
import { Separator } from "@/components/ui/separator";

// type FormState = {
//   success: boolean;
//   rules?: Rule[];
//   destinations?: Destination[];
//   token?: string;
// };

function DashBoard() {
  // const params = useParams<{ username: string }>();
  const {
    user,
    setUser,
    setRules,
    rules,
    destinations,
    setDestinations,
    setError,
  } = useAppContext();

  const stateInitial = {
    success: false,
    rules,
    destinations,
  };
  // const { username } = params;

  const [state, fetchData] = useActionState(async () => {
    let localUser;
    let localRules;
    let localDestinations;
    if (!user) {
      localUser = await getLocalUser();
      if (localUser) {
        setUser(localUser);
        window.history.replaceState(null, "", `/user/${localUser.username}`);
      }

      localRules = await getLocalRules(localUser?.username);
      if (localRules && localUser?.username === localRules[0].username) {
        setRules(localRules);
      }
      localDestinations = await getLocalDestinations(localUser?.username);
      if (
        localDestinations &&
        localUser?.username === localDestinations[0].username
      ) {
        setDestinations(localDestinations);
      }
    } else {
      localUser = user;
    }

    if (!localUser) {
      setError("You Must be Logged in to access this Resource");
      return {
        success: false,
        rules: undefined,
        destinations: undefined,
      };
    }

    let updatedRules: Rule[] | undefined;
    let updatedDestinations: Destination[] | undefined;

    if (localUser.aliasCount > 0 && !localRules) {
      const rulesResult = await fetchRules();
      if (!rulesResult.error && rulesResult.rules) {
        updatedRules = rulesResult.rules;
      }
    }

    if (localUser.destinationCount > 0 && !localDestinations) {
      const destinationsResult = await fetchDestinations();

      if (!destinationsResult.error && destinationsResult.destinations) {
        updatedDestinations = destinationsResult.destinations;
      }
    }

    if (updatedRules) {
      setRules(updatedRules);
    }
    if (updatedDestinations) {
      setDestinations(updatedDestinations);
    }

    return {
      success: true,
      rules: updatedRules,
      destinations: updatedDestinations,
    };
  }, stateInitial);

  useEffect(() => {
    console.log("DashBoard Use Effect for fetching Rules from API was called");

    const init = async () => {
      const hiddenForm = document.getElementById(
        "hiddenForm",
      ) as HTMLFormElement;
      if (hiddenForm) {
        hiddenForm.requestSubmit();
      }
    };

    init();
  }, []);
  return (
    <>
      <form
        style={{
          width: "0",
          height: "0",
          position: "absolute",
          visibility: "hidden",
        }}
        id="hiddenForm"
        action={fetchData}
      >
        <input type="text" id="hiddenInput" />
        <button type="submit" id="hiddenSubmit">
          Submit
        </button>
      </form>
      {state.success && (
        <main className="dash_wrapper">
          <div className="dash_child">
            <UserField />
          </div>
          {/* <Separator className="w-1/2" /> */}
          <Separator className="w-1/2" />
          <div className="dash_child">
            <RuleFields />
          </div>
          <Separator className="w-1/2" />
          <div className="dash_child">
            <DestinationField />
          </div>
        </main>
      )}
    </>
  );
}

export default DashBoard;
