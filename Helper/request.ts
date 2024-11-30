import {
  DataObject,
  HttpMethod,
  RequestResult,
  ResponseObject,
  UrlEndpoints,
} from "@/Helper/types";
import { getCookieFromString } from "@/hooks/useSetCookie";
import { TokenHandler } from "@/utils/token";

const BASE_URL = `${process.env.BACKEND_HOST}/api/v2`;

const resolveEndpoint = (
  endpoint: UrlEndpoints,
  params: Record<string, string | number> = {},
): string => {
  return endpoint.replace(/:([a-zA-Z]+)/g, (_, key) => {
    if (params[key] === undefined) {
      throw new Error(`Missing parameter: ${key}`);
    }
    return encodeURIComponent(String(params[key]));
  });
};

const createRequest = async (
  method: HttpMethod,
  endpoint: UrlEndpoints,
  params: Record<string, string | number> = {},
  token?: string,
  data?: DataObject,
): Promise<RequestResult> => {
  try {
    const resolvedUrl = `${BASE_URL}${resolveEndpoint(endpoint, params)}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Token handling
    if (token) {
      // Decode token if it's encoded, otherwise encode it
      const finalToken = (await TokenHandler.isValidEncodedToken(token))
        ? await TokenHandler.decode(token)
        : token;

      if (!finalToken) {
        console.log("Invalid or expired token");
        return {
          data: null,
          error: "Invalid or expired token",
          status: 401,
        };
      }
      headers.Authorization = `Bearer ${finalToken}`;
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers,
      credentials: "include", // equivalent to withCredentials: true in Axios
      ...(data && { body: JSON.stringify(data) }), // only add body if data exists
    };

    // Perform fetch request
    const response = await fetch(resolvedUrl, fetchOptions);

    // Extract cookies from response headers
    const cookieHeader = response.headers.get("set-cookie");
    const cookieToken = cookieHeader
      ? getCookieFromString(cookieHeader, "token")
      : undefined;
    let responseData = {} as ResponseObject;
    if (response.status !== 204) {
      responseData = (await response.json()) as ResponseObject;
    }

    // Check for error conditions
    if (!response.ok || responseData.status === "fail") {
      return {
        data: responseData,
        error: responseData.message || "An error occurred",
        status: response.status,
        cookies: cookieToken
          ? await TokenHandler.encode(cookieToken)
          : undefined,
      };
    }

    // Successful response
    return {
      data: responseData,
      error: null,
      status: response.status,
      cookies: cookieToken ? await TokenHandler.encode(cookieToken) : undefined,
    };
  } catch (error) {
    // Handle network errors or JSON parsing errors
    console.error("Request error:", error);

    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      status: 500,
    };
  }
};

export default createRequest;
