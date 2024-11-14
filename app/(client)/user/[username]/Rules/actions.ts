"use server";

import { createRequest } from "@/Helper/request";
import { Rule } from "@/Helper/types";

async function createRule(
  rule: Omit<Rule, "ruleId" | "active">,
  token: string,
): Promise<{
  success: boolean;
  error?: string;
  status: number;
  newRule?: Rule;
}> {
  try {
    const ruleResult = await createRequest(
      "POST",
      "/mail/rules",
      {},
      token,
      rule,
    );

    if (ruleResult.error || !ruleResult.data || !ruleResult.data.data) {
      return {
        success: false,
        error: ruleResult.error || "Unknown Error Occurred",
        status: ruleResult.status,
      };
    }

    const newRule = ruleResult.data.data as Rule;

    if (ruleResult.status === 201) {
      return {
        success: true,
        newRule,
        status: ruleResult.status,
      };
    }

    return {
      success: false,
      error: "Request failed",
      status: ruleResult.status,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    };
  }
}

async function updateRule(
  rule: Rule,
  token: string,
): Promise<{
  success: boolean;
  status: number;
  error?: string;
}> {
  try {
    const ruleResult = await createRequest(
      "PATCH",
      "/mail/rules/:ruleId",
      { ruleId: rule.ruleId },
      token,
      rule,
    );
    if (ruleResult.status === 401) {
      return {
        status: ruleResult.status,
        success: false,
        error: ruleResult.error || "Session Expired",
      };
    }
    if (ruleResult.error || !ruleResult.data || !ruleResult.data.data) {
      return {
        success: false,
        status: ruleResult.status,
        error: ruleResult.error || "Unknown Error Occurred",
      };
    }
    return {
      success: true,
      status: ruleResult.status,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
async function toggleRule(
  rule: Rule,
  token: string,
): Promise<{
  success: boolean;
  status: number;
  error?: string;
}> {
  try {
    const ruleResult = await createRequest(
      "PATCH",
      "/mail/rules/:ruleId/toggle",
      { ruleId: rule.ruleId },
      token,
    );
    if (ruleResult.status === 401) {
      return {
        status: ruleResult.status,
        success: false,
        error: ruleResult.error || "Session Expired",
      };
    }
    if (ruleResult.error || !ruleResult.data || !ruleResult.data.data) {
      return {
        success: false,
        status: ruleResult.status,
        error: ruleResult.error || "Unknown Error Occurred",
      };
    }
    return {
      success: true,
      status: ruleResult.status,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

async function deleteRule(
  rule: Rule,
  token: string,
): Promise<{
  success: boolean;
  status: number;
  error?: string;
}> {
  try {
    const ruleResult = await createRequest(
      "DELETE",
      "/mail/rules/:ruleId",
      { ruleId: rule.ruleId },
      token,
    );
    if (ruleResult.status === 401) {
      return {
        status: ruleResult.status,
        success: false,
        error: ruleResult.error || "Session Expired",
      };
    }
    if (ruleResult.error || ruleResult.status !== 204) {
      return {
        success: false,
        status: ruleResult.status,
        error: ruleResult.error || "Unknown Error Occurred",
      };
    }
    return {
      success: true,
      status: ruleResult.status,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export { createRule, updateRule, deleteRule, toggleRule };
