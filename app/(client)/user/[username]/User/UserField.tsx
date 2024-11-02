"use client";

import { useEffect, useState } from "react";
import useAppContext from "@/hooks/useAppContext";

import UserProfileCard from "./UserCard";
// import { redirect } from "next/navigation";
import { User } from "@/Helper/types";

function UserField() {
  const { user, setUser, rules, destinations } = useAppContext();
  const [aliasCount, setAliasCount] = useState(rules.length);
  const [destinationCount, setDestinationCount] = useState(destinations.length);

  useEffect(() => {
    console.log("fetch user useEffect was called");
    const fetchUser = async () => {
      if (!user) {
        const userLocal = localStorage.getItem("user");
        if (userLocal) {
          const parsedUser = JSON.parse(userLocal) as User;
          setUser(parsedUser);
        } else {
          return;
        }
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
    <section>
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
