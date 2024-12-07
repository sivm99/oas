import { fetchUser } from "@/Helper/getData";
import UserProfileCard from "./UserCard";

async function UserField() {
  const { user } = await fetchUser();
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
