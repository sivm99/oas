"use server";
import axios, { AxiosError } from "axios";
import {
  DataObject,
  HttpMethod,
  RequestResult,
  ResponseObject,
} from "@/Helper/types";
import { getCookieFromString } from "@/hooks/useSetCookie";

const BASE_URL = `${process.env.BACKEND_HOST}/api/v2`;

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export type UrlEndpoints =
  | "/"
  | "/auth/forget-password"
  | "/auth/github"
  | "/auth/google"
  | "/auth/login"
  | "/auth/register"
  | "/auth/reset-password/:token"
  | "/auth/signup"
  | "/mail/destinations"
  | "/mail/destinations/:destinationID"
  | "/mail/destinations/:destinationID/verify"
  | "/mail/rules"
  | "/mail/rules/:ruleId"
  | "/mail/rules/:ruleId/toggle"
  | "/user"
  | "/user/:username"
  | "/user/:username/logout"
  | "/user/:username/update-password"
  | "/user/:username/verify"
  | "/user/:username/verify/:token";

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
  console.log("create request to api was called");

  try {
    const resolvedUrl = resolveEndpoint(endpoint, params);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await instance.request<ResponseObject>({
      method,
      url: resolvedUrl,
      data,
      headers,
    });

    return {
      data: response.data,
      error: null,
      status: response.status,
      cookies: getCookieFromString(
        response.headers["set-cookie"]?.join("; ") || "",
        "token",
      ),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ResponseObject>;
      if (axiosError.response) {
        return {
          data: axiosError.response.data,
          error: axiosError.response.data.message || "An error occurred",
          status: axiosError.response.status,
          // cookies: getCookieFromString(response.headers["set-cookie"]?.join("; "), "token"),
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
