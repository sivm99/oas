"use client";

// import { getLocalRules } from "@/Helper/getLocalData";
import useAppContext from "@/hooks/useAppContext";
// import { useEffect } from "react";
import RulesCard from "./RuleCard";
import NewRule from "./NewRule";

function RuleFields() {
  const { rules } = useAppContext();

  return (
    <section>
      <NewRule />
      <RulesCard rules={rules} />
    </section>
  );
}

export default RuleFields;
