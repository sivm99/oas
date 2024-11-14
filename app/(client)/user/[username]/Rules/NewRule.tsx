"use client";

import { Button } from "@/components/ui/button";

import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";
import { CreateRuleDialog } from "./CreateRuleDialouge";
import { createRule } from "./actions";

function NewRule() {
  const { destinations, token, setError, setRules, rules, setLoginExpired } =
    useAppContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full max-w-full  mx-auto">
      {!showForm && destinations.length > 0 && (
        <Button
          variant="outline"
          onClick={() => setShowForm(true)}
          className="flex w-full items-center gap-2 border-transparent animate-border-glow border-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create New Rule
        </Button>
      )}

      {showForm && (
        <CreateRuleDialog
          destinations={destinations}
          onAction={async (formData) => {
            const alias = formData.get("alias") as string;
            const domain = formData.get("domain") as string;
            const destinationEmail = formData.get("destinationEmail") as string;
            const name = formData.get("rule-name") as string;
            const comment = formData.get("comment") as string;

            if (!token) {
              setLoginExpired(true);
            }

            const ruleResult = await createRule(
              {
                username: destinations[0].username,
                aliasEmail: alias + domain,
                destinationEmail,
                name,
                comment,
              },
              token,
            );
            if (!ruleResult.success && ruleResult.status === 401) {
              setLoginExpired(true);
              return;
            }
            if (
              ruleResult.error ||
              !ruleResult.newRule ||
              !ruleResult.success
            ) {
              setError(ruleResult.error);
              return;
            }
            const newRule = ruleResult.newRule;
            setRules([...rules, newRule]);

            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default NewRule;
