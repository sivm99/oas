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
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  MoreVertical,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { RuleDialog } from "./RuleDialog";
import { deleteRule, toggleRule, updateRule } from "./actions";
import { motion } from "framer-motion";
import useSimpleAppContext from "@/hooks/useSimpleAppContext";
import SmallLoader from "@/components/assets/SmallLoader";
import { useRouter, useSearchParams } from "next/navigation";
// Separate RuleCard Component
const RuleCard = ({ rule }: { rule: Rule }) => {
  const { setHint, setError, setLoginExpired } = useSimpleAppContext();
  const [showDelete, setShowDelete] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleEditAction = async (r: Rule) => {
    setHint(<SmallLoader />);
    const ruleResult = await updateRule(r);
    if (ruleResult.status === 401) {
      setHint(null);
      setLoginExpired(true);
      return;
    }
    if (ruleResult.error) {
      setHint(null);
      setError(
        ruleResult.error || "Rule cant Be update try Again after some time",
      );
      setShowEdit(false);
      return;
    }
    if (ruleResult.success) {
      setHint(null);
      window.location.reload();
    }
    setHint(null);
    setShowEdit(false);
    return;
  };

  const handleToggleAction = async (r: Rule) => {
    setHint(<SmallLoader />);
    const ruleResult = await toggleRule(r);
    if (ruleResult.status === 401) {
      setHint(null);
      setLoginExpired(true);
      setShowToggle(false);
      return;
    }
    if (ruleResult.error) {
      setHint(null);
      setError(
        ruleResult.error || "Rule cant Be update try Again after some time",
      );
      setShowToggle(false);
      return;
    }

    if (ruleResult.success) {
      setHint(null);
      window.location.reload();
    }
    setHint(null);
    setShowToggle(false);
    return;
  };

  const handleDeleteAction = async (rule: Rule) => {
    setHint(<SmallLoader />);
    const ruleResult = await deleteRule(rule);
    if (ruleResult.status === 401) {
      setHint(null);
      setLoginExpired(true);
      return;
    }
    if (ruleResult.error || ruleResult.status !== 204) {
      setHint(null);
      setError(
        ruleResult.error || "Rule cant Be update try Again after some time",
      );
      setShowDelete(false);
      return;
    }
    setHint(null);
    window.location.reload();

    setShowDelete(false);
    return;
  };

  return (
    <Card className={cn(!rule.active && "opacity-60")}>
      {showEdit && (
        <RuleDialog
          rule={rule}
          type="edit"
          onAction={handleEditAction}
          onCancel={() => setShowEdit(false)}
        />
      )}
      {showToggle && (
        <RuleDialog
          rule={rule}
          type="toggle"
          onAction={handleToggleAction}
          onCancel={() => setShowToggle(false)}
        />
      )}
      {showDelete && (
        <RuleDialog
          rule={rule}
          type="delete"
          onAction={handleDeleteAction}
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
                  <b>{rule.aliasEmail}</b> has been copied to your clipboard.
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

const COLUMN_LABELS: Record<SortKey, string> = {
  name: "Name",
  aliasEmail: "Alias",
  destinationEmail: "Destination",
  active: "Active",
};
// Define sorting order to show active first
type SortKey = keyof Pick<
  Rule,
  "name" | "aliasEmail" | "destinationEmail" | "active"
>;

// Default constants
const DEFAULT_SORT_KEY: SortKey = "active";
const DEFAULT_SORT_DIR: "asc" | "desc" = "desc";
const DEFAULT_PAGE = 1;
const RULES_PER_PAGE = 5;

// Search Component
const SearchRules = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  return (
    <div className="relative flex-grow mr-4">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by alias email..."
        className="pl-10 w-full rounded-lg border border-gray-200 focus:border-primary"
        defaultValue={currentSearch}
        onChange={(e) => onSearch(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
};

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

function RulesCard({ rules }: { rules?: Rule[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract state entirely from URL
  const sortKey = (searchParams.get("sortBy") as SortKey) || DEFAULT_SORT_KEY;
  const sortDir =
    (searchParams.get("sortDir") as "asc" | "desc") || DEFAULT_SORT_DIR;
  const currentPage = parseInt(
    searchParams.get("page") || `${DEFAULT_PAGE}`,
    10,
  );
  const searchQuery = searchParams.get("search") || "";

  // Filtering and Sorting logic
  const filteredAndSortedRules = useMemo(() => {
    if (!rules) return [];

    // First, filter by search query
    const filtered = rules.filter((rule) =>
      rule.aliasEmail.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Then sort
    return [...filtered].sort((a, b) => {
      // Special handling for active status to show true first
      if (sortKey === "active") {
        if (a.active === b.active) return 0;
        // When descending, active (true) comes first
        if (sortDir === "desc") {
          return a.active ? -1 : 1;
        }
        // When ascending, inactive (false) comes first
        return a.active ? 1 : -1;
      }

      // Handle other types of sorting
      const aValue = a[sortKey] ?? "";
      const bValue = b[sortKey] ?? "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDir === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }, [rules, sortKey, sortDir, searchQuery]);

  if (!rules) return <EmptyState />;

  // Pagination calculations
  const totalPages = Math.ceil(
    (filteredAndSortedRules.length || 0) / RULES_PER_PAGE,
  );
  const indexOfLastRule = currentPage * RULES_PER_PAGE;
  const indexOfFirstRule = indexOfLastRule - RULES_PER_PAGE;
  const currentRules = filteredAndSortedRules.slice(
    indexOfFirstRule,
    indexOfLastRule,
  );

  // Common utility for URL updates
  const updateUrlParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  // Unified sort handler
  const handleSort = (key: SortKey) => {
    const newSortDir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    updateUrlParams({
      sortBy: key,
      sortDir: newSortDir,
      page: "1", // Reset page on sort change
    });
  };

  // Search handler with debounced update
  const handleSearch = (searchValue: string) => {
    updateUrlParams({
      search: searchValue,
      page: "1", // Reset page on new search
    });
  };

  // Simple page navigation
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateUrlParams({ page: newPage.toString() });
    }
  };

  return (
    <div className="grid gap-4">
      <motion.div
        className="space-y-4 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <SearchRules onSearch={handleSearch} />

          <div className="flex items-center space-x-2">
            {/* Sorting Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 space-x-2 border-2 border-gray-200 hover:border-primary"
                >
                  <span>{COLUMN_LABELS[sortKey]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(
                  [
                    "name",
                    "aliasEmail",
                    "destinationEmail",
                    "active",
                  ] as SortKey[]
                ).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onSelect={() => handleSort(key)}
                    className={sortKey === key ? "bg-accent" : ""}
                  >
                    {COLUMN_LABELS[key]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Separate Sort Direction Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleSort(sortKey)}
              className="border-2 border-gray-200 hover:border-primary"
            >
              {sortDir === "asc" ? (
                <ArrowUp size={20} />
              ) : (
                <ArrowDown size={20} />
              )}
            </Button>
          </div>
        </div>

        {currentRules?.map((rule: Rule, index: number) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-2 border-gray-200 hover:border-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-2 border-gray-200 hover:border-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default RulesCard;
