"use client";
import { useState } from "react";
import { CreateRuleDialog } from "./CreateRuleDialouge";
import { createRule } from "./actions";
import useSimpleAppContext from "@/hooks/useSimpleAppContext";
import { Destination } from "@/Helper/types";
import { useRouter } from "next/navigation";
import { GlowButton } from "@/components/ui/glow-button";

function NewRule({
  destinations,
  aliasCount,
}: {
  destinations: Destination[];
  aliasCount: number;
}) {
  const { setLoginExpired, setError } = useSimpleAppContext();
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full max-w-full  mx-auto">
      {!showForm && destinations && (
        <GlowButton
          variant="outline"
          // glowVariant="premium"
          onClick={() => setShowForm(true)}
          className="flex w-full items-center gap-2 "
        >
          Create New Rule
        </GlowButton>
      )}

      {showForm && (
        <CreateRuleDialog
          destinations={destinations}
          c={aliasCount + 1}
          onAction={async (formData) => {
            const alias = formData.get("alias") as string;
            const domain = formData.get("domain") as string;
            const destinationEmail = formData.get("destinationEmail") as string;
            const name = formData.get("rule-name") as string;
            const comment = formData.get("comment") as string;

            const ruleResult = await createRule({
              username: destinations[0].username,
              aliasEmail: alias + domain,
              destinationEmail,
              name,
              comment,
            });
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

            router.refresh();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default NewRule;
