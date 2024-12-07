import { fetchDestinations, fetchUser } from "@/Helper/getData";
import DestinationsCard from "./DestinationCard";

async function DestinationField() {
  const [u, d] = await Promise.all([fetchUser(), fetchDestinations()]);
  return (
    <section>
      <DestinationsCard destinations={d.destinations} user={u.user} />
    </section>
  );
}

export default DestinationField;
