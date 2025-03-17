"use server";

import fetchData from "@/app/(client)/user/[username]/actions";
import { Destination, Rule, User } from "./types";
import { cookies } from "next/headers";

export async function fetchUser(): Promise<{
  user?: User;
  error?: string;
  newToken?: string;
  code: number;
}> {
  const c = await cookies();
  const cToken = c.get("token");
  if (!cToken) {
    return { error: "Unauthorized", code: 401 };
  }
  const response = await fetchData("user", cToken.value);
  if (!response.success) {
    return { error: response.message, code: response.code };
  }
  return {
    user: response.data,
    code: response.code,
    newToken: response.newToken,
  };
}

export async function fetchRules(): Promise<{
  rules?: Rule[];
  error?: string;
  newToken?: string;
  code: number;
}> {
  const c = await cookies();
  const cToken = c.get("token");
  if (!cToken) {
    return { error: "Unauthorized", code: 401 };
  }
  const response = await fetchData("rules", cToken.value);
  if (!response.success) {
    return { error: response.message, code: response.code };
  }
  return {
    rules: response.data,
    code: response.code,
  };
}

export async function fetchDestinations(): Promise<{
  destinations?: Destination[];
  error?: string;
  newToken?: string;
  code: number;
}> {
  const c = await cookies();
  const cToken = c.get("token");
  if (!cToken) {
    return { error: "Unauthorized", code: 401 };
  }
  const response = await fetchData("destinations", cToken.value);
  if (!response.success) {
    return { error: response.message, code: response.code };
  }
  return {
    destinations: response.data,
    code: response.code,
  };
}
