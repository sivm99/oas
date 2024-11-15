"use client";
import { Rule } from "@/Helper/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Mail, MoreVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import useAppContext from "@/hooks/useAppContext";

import { cn } from "@/lib/utils";
import { RuleDialog } from "./RuleDialog";
import { db } from "@/Helper/dbService";
import { deleteRule, toggleRule, updateRule } from "./actions";
import { motion } from "framer-motion";
// Separate RuleCard Component
const RuleCard = ({ rule }: { rule: Rule }) => {
  const {
    setHint,

    setError,
    rules,
    setRules,
    setLoginExpired,
  } = useAppContext();
  const [showDelete, setShowDelete] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Card className={cn(!rule.active && "opacity-60")}>
      {showEdit && (
        <RuleDialog
          rule={rule}
          type="edit"
          onAction={async (rule) => {
            const ruleResult = await updateRule(rule);
            if (ruleResult.status === 401) {
              setLoginExpired(true);
              return;
            }
            if (ruleResult.error) {
              setError(
                ruleResult.error ||
                  "Rule cant Be update try Again after some time",
              );
              setShowEdit(false);
              return;
            }
            if (ruleResult.success) {
              setRules(
                rules.map((r) => {
                  if (r.ruleId === rule.ruleId) {
                    return rule;
                  }
                  return r;
                }),
              );
            }
            setShowEdit(false);
            return;
          }}
          onCancel={() => setShowEdit(false)}
        />
      )}
      {showToggle && (
        <RuleDialog
          rule={rule}
          type="toggle"
          onAction={async (rule) => {
            const ruleResult = await toggleRule(rule);
            if (ruleResult.status === 401) {
              setLoginExpired(true);
              setShowToggle(false);
              return;
            }
            if (ruleResult.error) {
              setError(
                ruleResult.error ||
                  "Rule cant Be update try Again after some time",
              );
              setShowToggle(false);
              return;
            }

            if (ruleResult.success) {
              const updatedRule = { ...rule, active: !rule.active };
              setRules(
                rules.map((rule) => {
                  if (rule.ruleId === updatedRule.ruleId) {
                    return updatedRule;
                  }
                  return rule;
                }),
              );
            }
            setShowToggle(false);
            return;
          }}
          onCancel={() => setShowToggle(false)}
        />
      )}
      {showDelete && (
        <RuleDialog
          rule={rule}
          type="delete"
          onAction={async (rule) => {
            const ruleResult = await deleteRule(rule);
            if (ruleResult.status === 401) {
              setLoginExpired(true);
              return;
            }
            if (ruleResult.error || ruleResult.status !== 204) {
              setError(
                ruleResult.error ||
                  "Rule cant Be update try Again after some time",
              );
              setShowDelete(false);
              return;
            }
            setRules(
              rules.filter((prevRule) => prevRule.ruleId !== rule.ruleId),
            );
            db.deleteRuleById(rule.ruleId);

            setShowDelete(false);
            return;
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-bold">
            {rule.name || "Unnamed Rule"}
          </CardTitle>
          <CardDescription>{rule.comment || "No description"}</CardDescription>
        </div>
        <div className="flex items-center">
          <Button
            title={`Copy ${rule.aliasEmail}`}
            variant="ghost"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(rule.aliasEmail);
              setHint(
                <>
                  Alias email <b>{rule.aliasEmail}</b> has been copied to your
                  clipboard.
                </>,
              );
            }}
          >
            <Copy size={20} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="options">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setShowToggle(!showToggle)}>
                {rule.active ? "Disable Rule" : "Enable Rule"}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowEdit(!showEdit)}>
                Edit Rule
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onSelect={() => setShowDelete(!showDelete)}
              >
                Delete Rule
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              From:<strong> {rule.aliasEmail}</strong>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              To: {rule.destinationEmail}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Search Component
const SearchRules = ({ onSearch }: { onSearch: (value: string) => void }) => (
  <div className="relative">
    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
    <Input
      type="text"
      placeholder="Search by alias email..."
      className="pl-10 w-full rounded-lg "
      onChange={(e) => onSearch(e.target.value)}
      autoComplete="off"
    />
  </div>
);

// Empty State Component
const EmptyState = () => (
  <Card className="mt-4">
    <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
      <Mail className="h-6 w-6 text-muted-foreground" />
      <CardTitle className="text-lg font-medium text-center">
        No Rules Yet
      </CardTitle>
      <CardDescription className="text-center">
        Create your first email forwarding rule to get started
      </CardDescription>
    </CardContent>
  </Card>
);

// Main Component
function RulesCard({ rules }: { rules: Rule[] }) {
  const [filteredRules, setFilteredRules] = useState(rules);

  useEffect(() => {
    console.log("Search Rules effect is called");
    setFilteredRules(rules);
  }, [rules]);

  const handleSearch = (searchValue: string) => {
    const filtered = rules.filter((rule) =>
      rule.aliasEmail.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredRules(filtered);
  };

  return (
    <div className="grid gap-4">
      {rules.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          className="space-y-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SearchRules onSearch={handleSearch} />
          {filteredRules.map((rule, index) => (
            <motion.div
              key={rule.ruleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <RuleCard rule={rule} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default RulesCard;
