"use client";

import { useEffect, useState } from "react";
import useAppContext from "@/hooks/useAppContext";

import UserProfileCard from "./UserCard";
import { redirect } from "next/navigation";
import { getLocalUser } from "@/Helper/getLocalData";

function UserField() {
  const { user, setUser, rules, destinations } = useAppContext();
  const [aliasCount, setAliasCount] = useState(rules.length);
  const [destinationCount, setDestinationCount] = useState(destinations.length);

  useEffect(() => {
    console.log("fetch user useEffect was called");
    const fetchUser = async () => {
      if (!user) {
        const parsedUser = await getLocalUser();
        if (!parsedUser) {
          redirect("/login");
        }
        setUser(parsedUser);
      } else {
        redirect("/login");
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAliasCount(rules.length);
    setDestinationCount(destinations.length);
  }, [rules, destinations]);

  return (
    <section className="p-4 ">
      {user && (
        <UserProfileCard
          {...user}
          aliasCount={aliasCount}
          destinationCount={destinationCount}
        />
      )}
    </section>
  );
}

export default UserField;
