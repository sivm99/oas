"use server";

import createRequest from "@/Helper/request";
import { Rule } from "@/Helper/types";
// import { revalidatePath } from "next/cache";
// import { setAuthCookie } from "@/utils/authcb";
import { cookies } from "next/headers";

async function createRule(rule: Omit<Rule, "ruleId" | "isActive">): Promise<{
  success: boolean;
  error?: string;
  status: number;
}> {
  try {
    const c = await cookies();
    const token = c.get("token")?.value;
    if (!token) {
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };
    }
    const ruleResult = await createRequest({
      method: "POST",
      endpoint: "/mail/rules",
      token,
      data: rule,
    });

    if (ruleResult.error || !ruleResult.data) {
      return {
        success: false,
        error: ruleResult.error || "Unknown Error Occurred",
        status: ruleResult.status,
      };
    }

    if (ruleResult.status === 201) {
      return {
        success: true,
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

async function updateRule(rule: Rule): Promise<{
  success: boolean;
  status: number;
  error?: string;
}> {
  try {
    const c = await cookies();
    const token = c.get("token")?.value;
    if (!token) {
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };
    }
    const ruleResult = await createRequest({
      method: "PATCH",
      endpoint: "/mail/rules/:ruleId",
      params: { ruleId: rule.ruleId },
      token,
      data: rule,
    });
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
    // await setAuthCookie()
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
async function toggleRule(rule: Rule): Promise<{
  success: boolean;
  status: number;
  error?: string;
}> {
  try {
    const c = await cookies();
    const token = c.get("token")?.value;
    if (!token) {
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };
    }
    const ruleResult = await createRequest({
      method: "PATCH",
      endpoint: "/mail/rules/:ruleId/toggle",
      params: { ruleId: rule.ruleId },
      token,
    });
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
    // revalidatePath("/user/[username]");
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

async function deleteRule(rule: Rule): Promise<{
  success: boolean;
  status: number;
  error?: string;
}> {
  try {
    const c = await cookies();
    const token = c.get("token")?.value;
    if (!token) {
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };
    }
    const ruleResult = await createRequest({
      method: "DELETE",
      endpoint: "/mail/rules/:ruleId",
      params: { ruleId: rule.ruleId },
      token,
    });
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
