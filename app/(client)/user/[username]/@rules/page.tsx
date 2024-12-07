// import { getLocalRules } from "@/Helper/getLocalData";
// import { useEffect } from "react";
import RulesCard from "./RuleCard";
import NewRule from "./NewRule";
import { fetchDestinations, fetchRules } from "@/Helper/getData";

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
          destinations={destinationsResponse.destinations}
          aliasCount={aliasCount}
        />
      )}
      <RulesCard rules={rulesResponse.rules || []} />
    </section>
  );
}

export default RuleFields;
