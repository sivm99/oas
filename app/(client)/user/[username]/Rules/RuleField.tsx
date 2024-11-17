// import { getLocalRules } from "@/Helper/getLocalData";
// import { useEffect } from "react";
import RulesCard from "./RuleCard";
import NewRule from "./NewRule";
import { Destination, Rule } from "@/Helper/types";

async function RuleFields({
  rules,
  destinations,
}: {
  rules?: Rule[];
  destinations?: Destination[];
}) {
  return (
    <section>
      {destinations && <NewRule destinations={destinations} />}
      <RulesCard rules={rules} />
    </section>
  );
}

export default RuleFields;
