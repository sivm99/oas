"use client";
import useAppContext from "@/hooks/useAppContext";
import DestinationsCard from "./DestinationCard";

import { useEffect } from "react";
import { getLocalDestinations } from "@/Helper/getLocalData";

function DestinationField() {
  const { destinations, setDestinations } = useAppContext();

  useEffect(() => {
    console.log("fetch Destination useEffect was called");
    const fetchLocalDestinations = async () => {
      const r = await getLocalDestinations();
      if (!r) return;
      setDestinations(r);
    };
    fetchLocalDestinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      {destinations && <DestinationsCard destinations={destinations} />}
      {/* <NewDestination /> */}
    </section>
  );
}

export default DestinationField;
