"use client";
import useAppContext from "@/hooks/useAppContext";
import DestinationsCard from "./DestinationCard";

function DestinationField() {
  const { destinations } = useAppContext();

  return (
    <section>
      {destinations && <DestinationsCard destinations={destinations} />}
      {/* <NewDestination /> */}
    </section>
  );
}

export default DestinationField;
