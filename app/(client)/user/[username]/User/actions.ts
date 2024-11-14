"use server";

import { createRequest } from "@/Helper/request";

import { User } from "@/Helper/types";

async function updateUser({
  username,
  name,
  newUsername,
  avatar,
  token,
}: {
  username: string;
  name?: string;
  newUsername?: string;
  avatar?: string;
  token: string;
}): Promise<{
  user: User | null;
  error: string | null;
  message: string;
  status: number;
  success: boolean;
}> {
  try {
    const response = await createRequest(
      "PATCH",
      "/user/:username",
      { username },
      token,
      {
        name,
        username: newUsername,
        avatar,
      },
    );

    if (response.status === 401) {
      return {
        user: null,
        error: "You must be logged in to update your details.",
        message: "Unauthorized",
        status: 401,
        success: false,
      };
    }

    if (response.error || !response.data || !response.data.data) {
      return {
        user: null,
        error: response.error || "User details could not be updated.",
        message: "Error updating user",
        status: response.status,
        success: false,
      };
    }

    const updatedUser = response.data.data as User;
    return {
      user: updatedUser,
      error: null,
      message: "User details updated successfully",
      status: 200,
      success: true,
    };
  } catch (error) {
    return {
      user: null,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while verifying email",
      message: "Internal server error",
      status: 500,
      success: false,
    };
  }
}
async function verifyUserEmail(
  username: string,
  token: string,
): Promise<{
  status: number;
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const verifyEmailResult = await createRequest(
      "GET",
      `/user/:username/verify`,
      { username },
      token,
    );

    if (!verifyEmailResult) {
      return { status: 500, success: false, error: "Failed to verify email" };
    }

    if (verifyEmailResult.status === 401) {
      return {
        status: 401,
        success: false,
        error: verifyEmailResult.error || "Unauthorized",
      };
    }

    if (verifyEmailResult.status === 200 && verifyEmailResult.data) {
      return {
        status: 200,
        success: true,
        message: verifyEmailResult.data.message,
      };
    }

    if (verifyEmailResult.error) {
      return { status: 400, success: false, error: verifyEmailResult.error };
    }

    return { status: 500, success: false, error: "An unknown error occurred" };
  } catch (error) {
    return {
      status: 500,
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while verifying email",
    };
  }
}

export { updateUser, verifyUserEmail };
