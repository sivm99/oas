"use server";

import createRequest from "@/Helper/request";
import { Destination } from "@/Helper/types";
import { cookies } from "next/headers";

async function addDestination({
  destinationEmail,
  domain,
}: {
  destinationEmail: string;
  domain: string;
}): Promise<{
  success: boolean;
  status: number;
  error?: string;
  newDestination?: Destination;
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
    const d = await createRequest({
      method: "POST",
      endpoint: "/mail/destinations",
      token,
      data: {
        destinationEmail,
        domain,
      },
    });
    if (d.error || !d.data || !d.data.data) {
      return {
        success: false,
        error: d.error || "Unknown Error Occurred",
        status: d.status,
      };
    }
    const newDestination = d.data.data as Destination;
    return {
      success: true,
      newDestination,
      status: d.status,
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "An unknown error occurred",
      status: 500,
    };
  }
}

async function verifyDestination({
  destinationID,
}: {
  destinationID: number;
}): Promise<{
  success: boolean;
  status: number;
  error?: string;
  verifiedDestination?: Destination;
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
    const d = await createRequest({
      endpoint: "/mail/destinations/:destinationID/verify",
      token,
      params: { destinationID },
    });
    if (d.error || !d.data || !d.data.data) {
      return {
        success: false,
        error: d.error || "Unknown Error Occurred",
        status: d.status,
      };
    }
    const verifiedDestination = d.data.data as Destination;
    return {
      success: true,
      verifiedDestination,
      status: d.status,
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "An unknown error occurred",
      status: 500,
    };
  }
}

async function removeDestination({
  destinationID,
  password,
}: {
  destinationID: number;
  password: string;
}): Promise<{
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
    const d = await createRequest({
      method: "DELETE",
      endpoint: "/mail/destinations/:destinationID",
      token,
      params: { destinationID },
      data: { password },
    });
    if (d.error) {
      return {
        success: false,
        error: d.error,
        status: d.status,
      };
    }
    return {
      success: true,
      status: d.status,
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "An unknown error occurred",
      status: 500,
    };
  }
}

export { addDestination, removeDestination, verifyDestination };
