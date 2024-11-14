"use server";

// import { createSession } from "@/app/auth/session";
import { createRequest, UrlEndpoints } from "@/Helper/request";
import {
  isDestinationsResponse,
  isRulesResponse,
  isUserResponse,
} from "@/Helper/typeFunction";
import { Destination, Rule, User } from "@/Helper/types";

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
  code: number;
  newToken?: string;
};

export default async function fetchData<T extends FetchData>(
  type: T,
  localToken?: string,
): Promise<FetchDataState<T>> {
  // const t = (await cookies()).get("token");

  // if (!t?.value || !localToken) {
  //   return {
  //     success: false,
  //     message:
  //       "Authentication Failure you are not Logged in You have to login again get It",
  //     code: 401,
  //   };
  // }

  const token = localToken;
  let endpoint: UrlEndpoints = "" as UrlEndpoints;

  if (type === "user") endpoint = "/user" as UrlEndpoints;
  if (type === "rules") endpoint = "/mail/rules" as UrlEndpoints;
  if (type === "destinations") endpoint = "/mail/destinations" as UrlEndpoints;

  try {
    const r = await createRequest("GET", endpoint, {}, token);

    if (r.error || !r.data) {
      return {
        success: false,
        message: r.error || "Unknown Error Occurred",
        code: r.status,
      };
    }

    const dataResponse = r.data;
    if (dataResponse.status !== "success") {
      return {
        success: false,
        message: `Fetching ${type} failed`,
        code: r.status,
      };
    }

    const newToken = r.cookies || "";
    // Handle type-specific validation and responses
    switch (type) {
      case "user":
        if (!isUserResponse(dataResponse)) {
          return {
            success: false,
            message: "Invalid User Response Format",
            code: r.status,
          };
        }
        return {
          success: true,
          message: "User Fetched Successfully",
          data: dataResponse.data as DataType<T>,
          newToken,
          code: r.status,
        };

      case "rules":
        if (!isRulesResponse(dataResponse)) {
          return {
            success: false,
            message: "Invalid Rules Response Format",
            code: r.status,
          };
        }
        return {
          success: true,
          message: "Rules Fetched Successfully",
          data: dataResponse.data as DataType<T>,
          code: r.status,
          newToken,
        };

      case "destinations":
        if (!isDestinationsResponse(dataResponse)) {
          return {
            success: false,
            message: "Invalid Destinations Response Format",
            code: r.status,
          };
        }
        return {
          success: true,
          message: "Destinations Fetched Successfully",
          data: dataResponse.data as DataType<T>,
          newToken,
          code: r.status,
        };
    }

    return {
      success: false,
      message: "Unknown type",
      code: r.status,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown Error Occurred",
      code: 500,
    };
  }
}
