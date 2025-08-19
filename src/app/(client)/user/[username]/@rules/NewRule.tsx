"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlowButton } from "@/components/ui/glow-button";
import type { Destination } from "@/types";
import useSimpleAppContext from "@/hooks/useSimpleAppContext";
import { createRule } from "./actions";
import { CreateRuleDialog } from "./CreateRuleDialouge";

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
          className="flex w-full items-center gap-2 "
          // glowVariant="premium"
          onClick={() => setShowForm(true)}
          variant="outline"
        >
          Create New Rule
        </GlowButton>
      )}

      {showForm && (
        <CreateRuleDialog
          c={aliasCount + 1}
          destinations={destinations}
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
            if (ruleResult.error || !ruleResult.success) {
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
