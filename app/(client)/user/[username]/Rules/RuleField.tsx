"use client";

import { getLocalRules } from "@/Helper/getLocalData";
import useAppContext from "@/hooks/useAppContext";
import { useEffect } from "react";
import RulesCard from "./RuleCard";
import NewRule from "./NewRule";

function RuleFields() {
  const { rules, setRules } = useAppContext();

  useEffect(() => {
    console.log("Fetch Rules useEffect was called");
    const fetchRules = async () => {
      const r = await getLocalRules();
      if (!r) return;
      setRules(r);
    };
    fetchRules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <RulesCard rules={rules} />
      <NewRule />
    </section>
  );
}

export default RuleFields;