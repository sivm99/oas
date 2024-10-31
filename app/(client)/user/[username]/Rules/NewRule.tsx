"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getLocalToken } from "@/Helper/getLocalData";
import { createRequest } from "@/Helper/request";
import { Rule } from "@/Helper/types";
import useAppContext from "@/hooks/useAppContext";
import { Mail } from "lucide-react";
import { useState } from "react";

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
    <div className="w-full max-w-full my-4 mx-auto">
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
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
          Create Rule
        </Button>
      )}

      {showForm && (
        <form
          action={async (formData) => {
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
          className="space-y-4 my-4"
        >
          {/* <label htmlFor="alias" className="text-sm font-medium">
            Cool Email<span className="text-red-500 ml-1">*</span>
          </label> */}
          <div className="flex flex-col sm:flex-row gap-2">
            <FormInput
              type="text"
              name="alias"
              id="alias"
              label="Cool Email"
              icon={Mail}
              placeholder="space-king"
              autoComplete="off"
              required
              className="flex-1"
              pattern="^\S*$"
              title="No spaces allowed"
              maxLength={20}
            />
            <div className="mb-1 mt-3">
              <label
                htmlFor="domain"
                className="block text-sm font-medium mb-3 "
              >
                Domain<span className="text-red-500 ml-1">*</span>
              </label>
              <Select name="domain" required>
                <SelectTrigger className="w-full flex-1 sm:flex-none sm:w-auto">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem
                      key={dest.destinationID}
                      value={`@${dest.domain}`}
                      id="domain"
                    >
                      @{dest.domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="destinationEmail"
            >
              Destination Email <span className="text-red-500 ml-1">*</span>
            </label>
            <Select name="destinationEmail" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select destination email" />
              </SelectTrigger>
              <SelectContent id="destinationEmail">
                {destinations.map((dest) => (
                  <SelectItem
                    key={dest.destinationID}
                    value={dest.destinationEmail}
                  >
                    {dest.destinationEmail}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="m-0">
            <FormInput
              type="text"
              id="rule-name"
              name="rule-name"
              label="Rule Name (Optional)"
              maxLength={50}
              placeholder="My adobe scan Id"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="comment">
              Rule Description (Optional)
            </label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="This Address is for Facebook"
              maxLength={200}
            />
          </div>
          <div className="flex gap-2 w-1/2 ">
            <Button type="submit" className="w-full">
              Save Rule
            </Button>
            <Button
              className="w-full"
              variant={"outline"}
              onClick={() => {
                setShowForm((s) => !s);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewRule;
