import DestinationsCard from "./DestinationCard";
import { Destination, User } from "@/Helper/types";

async function DestinationField({
  destinations,
  user,
}: {
  destinations?: Destination[];
  user?: User;
}) {
  return (
    <section>
      <DestinationsCard destinations={destinations} user={user} />
      {/* <NewDestination /> */}
    </section>
  );
}

export default DestinationField;
