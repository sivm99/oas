"use client";

import { Button } from "@/components/ui/button";

import { getLocalToken } from "@/Helper/getLocalData";
import { createRequest } from "@/Helper/request";
import { Rule } from "@/Helper/types";
import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";
import { CreateRuleDialog } from "./CreateRuleDialouge";

function NewRule() {
  const { destinations, token, setToken, setError, setRules, rules } =
    useAppContext();
  const [showForm, setShowForm] = useState(false);
  if (!token) {
    getLocalToken().then((localToken) => {
      if (localToken) {
        setToken(localToken);
      }
    });
  }

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

            const localToken = await getLocalToken();
            if (localToken) {
              setToken(localToken);
            }

            if (!token) {
              setError("Login Expired, Please Login Again");
            }

            const ruleResult = await createRequest(
              "POST",
              "/mail/rules",
              {},
              token,
              {
                aliasEmail: alias + domain,
                destinationEmail,
                name,
                comment,
              },
            );
            if (ruleResult.error || !ruleResult.data || !ruleResult.data.data) {
              setError(ruleResult.error || "Rule cant Be Created");
              setShowForm(false);
              return;
            }
            const newRule = ruleResult.data.data as Rule;
            setRules([...rules, newRule]);

            if (ruleResult.cookies) {
              setToken(ruleResult.cookies);
            }

            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default NewRule;
