"use client";
import useAppContext from "@/hooks/useAppContext";
import { useActionState, useEffect } from "react";
import { useParams } from "next/navigation";

import { fetchDestinations, fetchRules } from "@/Helper/getData";
import { Destination, Rule } from "@/Helper/types";
import {
  getLocalDestinations,
  getLocalRules,
  getLocalToken,
  getLocalUser,
} from "@/Helper/getLocalData";
import UserField from "./User/UserField";
import RuleFields from "./Rules/RuleField";
import DestinationField from "./Destinations/DestinationField";

type FormState = {
  success: boolean;
  rules?: Rule[];
  destinations?: Destination[];
  token?: string;
};

function DashBoard() {
  const params = useParams<{ username: string }>();
  const {
    user,
    setUser,
    token,
    setRules,
    setToken,
    rules,
    destinations,
    setDestinations,
    setError,
  } = useAppContext();

  const stateInitial = {
    success: false,
    rules,
    destinations,
    token,
  };
  const {} = params;

  const [state, fetchData] = useActionState(
    async (p: FormState, formData: FormData) => {
      let localUser;
      let localToken;
      let localRules;
      let localDestinations;
      console.log(formData.getAll("a"));
      if (!user || !token || !p.token) {
        localUser = await getLocalUser();
        if (localUser) {
          setUser(localUser);
          window.history.replaceState(null, "", `/user/${localUser.username}`);
        }

        localToken = await getLocalToken();
        if (localToken) {
          setToken(localToken);
        }

        localRules = await getLocalRules();
        if (localRules && localUser?.username === localRules[0].username) {
          setRules(localRules);
        }
        localDestinations = await getLocalDestinations();
        if (
          localDestinations &&
          localUser?.username === localDestinations[0].username
        ) {
          setDestinations(localDestinations);
        }
      } else {
        localUser = user;
        localToken = token;
      }

      if (!localUser || !localToken) {
        setError("You Must be Logged in to access this Resource");
        return {
          success: false,
          rules: undefined,
          destinations: undefined,
          token: undefined,
        };
      }

      let newToken: string | undefined;
      let updatedRules: Rule[] | undefined;
      let updatedDestinations: Destination[] | undefined;

      if (localUser.aliasCount && !localRules) {
        const rulesResult = await fetchRules(localToken);

        if (!rulesResult.error && rulesResult.rules) {
          updatedRules = rulesResult.rules;
          if (rulesResult.newToken) {
            newToken = rulesResult.newToken;
          }
        }
      }

      if (localUser.destinationCount && !localDestinations) {
        const destinationsResult = await fetchDestinations(localToken);

        if (!destinationsResult.error && destinationsResult.destinations) {
          updatedDestinations = destinationsResult.destinations;
          if (destinationsResult.newToken) {
            newToken = destinationsResult.newToken;
          }
        }
      }

      if (updatedRules) {
        setRules(updatedRules);
      }
      if (updatedDestinations) {
        setDestinations(updatedDestinations);
      }
      if (newToken) {
        setToken(newToken);
      }

      return {
        success: true,
        rules: updatedRules,
        destinations: updatedDestinations,
        token: newToken,
      };
    },
    stateInitial,
  );

  // useEffect(() => {
  //   console.log("URL rewrite useEffect");
  //   if (user?.username != username) {
  //     redirect(`/user/${user?.username}`);
  //   }
  // }, []);
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
  return state.success ? (
    <main className="dash_wrapper">
      <div className="dash_child">
        <UserField />
      </div>
      <div className="dash_child">
        <RuleFields />
      </div>
      <div className="dash_child">
        <DestinationField />
      </div>
    </main>
  ) : (
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
    </>
  );
}

export default DashBoard;
