"use client";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";

function NewRule() {
  const { destinations } = useAppContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full max-w-full my-4 mx-auto">
      <Button
        onClick={() => setShowForm(!showForm)}
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

      {showForm && (
        <form
          onSubmit={() => {
            setShowForm(false);
          }}
          className="space-y-4"
          action={async (f) => {
            const alias = f.get("alias");
            const comment = f.get("comment");
            const ruleName = f.get("rule-name");

            console.log(alias, comment, ruleName);
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Alias Email
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="alias"
                placeholder="username"
                className="flex-1 h-10 px-3 py-2 rounded-md border border-input bg-background"
              />
              <Select name="domain">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem
                      key={dest.destinationID}
                      value={`@${dest.domain}`}
                    >
                      @{dest.domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Destination Email
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select destination email" />
              </SelectTrigger>
              <SelectContent>
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

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              name="rule-name"
              maxLength={50}
              placeholder="Rule name"
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Comment (Optional)
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder="Add a comment"
              maxLength={60}
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
            />
          </div>

          <Button type="submit">Save Rule</Button>
        </form>
      )}
    </div>
  );
}

export default NewRule;
