"use client";
import useAppContext from "@/hooks/useAppContext";
import UserProfileCard from "./UserCard";

function UserField() {
  const { user, rules, destinations } = useAppContext();

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
