"use server";

import { createSession } from "@/app/auth/session";
import { createRequest } from "@/Helper/request";
import {
  isDestinationsResponse,
  isRulesResponse,
  isUserResponse,
} from "@/Helper/typeFunction";
import { Destination, Rule, User } from "@/Helper/types";
import { getCookieFromString } from "@/hooks/useSetCookie";
import { cookies } from "next/headers";

type FetchData = "user" | "rules" | "destinations";

type DataType<T> = T extends "user"
  ? User
  : T extends "rules"
    ? Rule[]
    : T extends "destinations"
      ? Destination[]
      : never;

export type FetchDataState<T extends FetchData> = {
  success: boolean;
  message: string;
  data?: DataType<T>;
  code?: number;
};

export default async function fetchData<T extends FetchData>(
  type: T,
  localToken?: string,
): Promise<FetchDataState<T>> {
  const t = (await cookies()).get("token");

  if (!t?.value) {
    return {
      success: false,
      message:
        "Authentication Failure you are not Logged in You have to login again",
      code: 401,
    };
  }

  const token = t.value || localToken;
  let endpoint = "";

  if (type === "user") endpoint += "/user";
  if (type === "rules") endpoint += "/mail/rules";
  if (type === "destinations") endpoint += "/mail/destinations";

  try {
    const r = await createRequest(endpoint, token);

    if (r.error || !r.data) {
      return {
        success: false,
        message: r.error || "Unknown Error Occurred",
      };
    }

    const dataResponse = r.data;
    if (dataResponse.status !== "success") {
      return {
        success: false,
        message: `Fetching ${type} failed`,
      };
    }

    const newToken = getCookieFromString(r?.cookies || "", "token");
    await createSession(newToken || " ");

    // Handle type-specific validation and responses
    switch (type) {
      case "user":
        if (!isUserResponse(dataResponse)) {
          return {
            success: false,
            message: "Invalid User Response Format",
          };
        }
        return {
          success: true,
          message: "User Fetched Successfully",
          data: dataResponse.data as DataType<T>,
        };

      case "rules":
        if (!isRulesResponse(dataResponse)) {
          return {
            success: false,
            message: "Invalid Rules Response Format",
          };
        }
        return {
          success: true,
          message: "Rules Fetched Successfully",
          data: dataResponse.data as DataType<T>,
        };

      case "destinations":
        if (!isDestinationsResponse(dataResponse)) {
          return {
            success: false,
            message: "Invalid Destinations Response Format",
          };
        }
        return {
          success: true,
          message: "Destinations Fetched Successfully",
          data: dataResponse.data as DataType<T>,
        };
    }

    return {
      success: false,
      message: "Unknown type",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown Error Occurred",
    };
  }
}
