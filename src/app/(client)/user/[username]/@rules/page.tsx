// import { getLocalRules } from "@/Helper/getLocalData";
// import { useEffect } from "react";

import { fetchDestinations, fetchRules } from "@/helper/get-data";
import NewRule from "./NewRule";
import RulesCard from "./RuleCard";

async function RuleFields() {
  const [rulesResponse, destinationsResponse] = await Promise.all([
    fetchRules(),
    fetchDestinations(),
  ]);
  const aliasCount = rulesResponse.rules?.length || 0;
  return (
    <section>
      {destinationsResponse.destinations && (
        <NewRule
          aliasCount={aliasCount}
          destinations={destinationsResponse.destinations}
        />
      )}
      <RulesCard rules={rulesResponse.rules || []} />
    </section>
  );
}

export default RuleFields;
