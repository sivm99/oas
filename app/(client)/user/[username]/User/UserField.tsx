"use client";

import { useEffect } from "react";
import useAppContext from "@/hooks/useAppContext";

import UserProfileCard from "./UserCard";
// import { redirect } from "next/navigation";
import { User } from "@/Helper/types";

function UserField() {
  const { user, setUser, rules, destinations } = useAppContext();

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

  return (
    <section>
      {user && (
        <UserProfileCard
          {...user}
          aliasCount={rules.length}
          destinationCount={destinations.length}
        />
      )}
    </section>
  );
}

export default UserField;
