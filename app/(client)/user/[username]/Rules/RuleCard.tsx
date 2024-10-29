import { Rule } from "@/Helper/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Copy,
  Mail,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

function RulesCard({ rules }: { rules: Rule[] }) {
  const [filteredRules, setFilteredRules] = useState(rules);

  // Initialize filteredRules with rules on mount
  useEffect(() => {
    setFilteredRules(rules);
  }, [rules]);

  return (
    <div className="grid gap-4">
      {rules.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
            <Mail className="h-12 w-12 text-muted-foreground" />
            <CardTitle className="text-lg font-medium text-center">
              No Rules Yet
            </CardTitle>
            <CardDescription className="text-center">
              Create your first email forwarding rule to get started
            </CardDescription>
          </CardContent>
        </Card>
      ) : null}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by alias email..."
            className="pl-10 w-full"
            onChange={(e) => {
              const searchValue = e.target.value.toLowerCase();
              const filteredRules = rules.filter((rule) =>
                rule.aliasEmail.toLowerCase().includes(searchValue),
              );
              setFilteredRules(filteredRules);
            }}
          />
        </div>
        {filteredRules.map((rule) => (
          <Card key={rule.ruleId}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-bold">
                  {rule.name || "Unnamed Rule"}
                </CardTitle>
                <CardDescription>
                  {rule.comment || "No description"}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Switch
                      checked={rule.active}
                      className={rule.active ? "bg-green-500" : "bg-red-500"}
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {rule.active ? "Disable" : "Enable"} Rule for{" "}
                        {rule.aliasEmail}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {rule.active
                          ? `Every email received to ${rule.aliasEmail} will be rejected and not reach ${rule.destinationEmail}`
                          : `Enable email forwarding to ${rule.destinationEmail}?`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={async () => {}}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(rule.aliasEmail);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Success!</AlertDialogTitle>
                      <AlertDialogDescription>
                        Alias email {rule.aliasEmail} has been copied to your
                        clipboard.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>OK</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Rule</AlertDialogTitle>
                      <AlertDialogDescription>
                        Update the rule details below:
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          defaultValue={rule.name}
                          onChange={(e) =>
                            console.log("name updated", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comment">Comment</Label>
                        <Input
                          id="comment"
                          defaultValue={rule.comment}
                          onChange={(e) =>
                            console.log("comment updated", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          console.log({
                            ruleId: rule.ruleId,
                            name: rule.name,
                            comment: rule.comment,
                          });
                        }}
                      >
                        Update
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="sm:max-w-[425px]">
                    <AlertDialogHeader>
                      <div className="flex flex-col space-y-2 text-center sm:text-left">
                        <AlertDialogTitle className="text-destructive flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Delete Rule?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the email forwarding rule.
                        </AlertDialogDescription>
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => console.log(rule.ruleId)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    From: {rule.aliasEmail}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    To: {rule.destinationEmail}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Created by: {rule.username}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RulesCard;
