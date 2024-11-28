/*
import axios, { AxiosError } from "axios";
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

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

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
    const resolvedUrl = resolveEndpoint(endpoint, params);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      // Decode token if it's encoded, otherwise encode it
      const finalToken = (await TokenHandler.isValidEncodedToken(token))
        ? await TokenHandler.decode(token)
        : token;

      if (!finalToken) {
        // throw new Error("Invalid or expired token");
        console.log("Invalid or expired token");
        return {
          data: null,
          error: "Invalid or expired token",
          status: 401,
        };
      }
      headers.Authorization = `Bearer ${finalToken}`;
    }

    const response = await instance.request<ResponseObject>({
      method,
      url: resolvedUrl,
      data,
      headers,
    });

    // Encode token from cookies if present
    const cookieToken = getCookieFromString(
      response.headers["set-cookie"]?.join("; ") || "",
      "token",
    );

    return {
      data: response.data,
      error: null,
      status: response.status,
      cookies: cookieToken ? await TokenHandler.encode(cookieToken) : undefined,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ResponseObject>;
      if (axiosError.response) {
        const cookieToken = getCookieFromString(
          axiosError.response.headers["set-cookie"]?.join("; ") || "",
          "token",
        );

        return {
          data: axiosError.response.data,
          error: axiosError.response.data.message || "An error occurred",
          status: axiosError.response.status,
          cookies: cookieToken
            ? await TokenHandler.encode(cookieToken)
            : undefined,
        };
      }
      return {
        data: null,
        error: "No response received from server",
        status: 500,
      };
    }
    return {
      data: null,
      error: "An unexpected error occurred",
      status: 500,
    };
  }
};

export { createRequest };
*/
