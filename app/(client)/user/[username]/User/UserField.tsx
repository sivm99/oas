import UserProfileCard from "./UserCard";
import { User } from "@/Helper/types";

async function UserField({ user }: { user?: User }) {
  return (
    <section>
      {user && (
        <UserProfileCard
          {...user}
          aliasCount={user.aliasCount}
          destinationCount={user.destinationCount}
        />
      )}
    </section>
  );
}

export default UserField;
