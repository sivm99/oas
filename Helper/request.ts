import axios, { AxiosError } from "axios";
import {
  DataObject,
  HttpMethod,
  RequestResult,
  ResponseObject,
} from "@/Helper/types";

const BASE_URL = `${process.env.BACKEND_HOST}/api/v2`;

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const createRequest = async (
  method: HttpMethod = "GET",
  url: string,
  data?: DataObject,
): Promise<RequestResult> => {
  try {
    const response = await instance.request<ResponseObject>({
      method,
      url,
      data,
    });

    // Extract cookies from response headers if present
    const cookies = response.headers["set-cookie"]?.join("; ");

    return {
      data: response.data,
      error: null,
      status: response.status,
      cookies: cookies,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ResponseObject>;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const cookies = axiosError.response.headers["set-cookie"]?.join("; ");
        return {
          data: axiosError.response.data,
          error: axiosError.response.data.message || "An error occurred",
          status: axiosError.response.status,
          cookies: cookies,
        };
      } else if (axiosError.request) {
        // The request was made but no response was received
        return {
          data: null,
          error: "No response received from server",
          status: 500,
        };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { data: null, error: axiosError.message, status: 500 };
      }
    } else {
      // Handle non-Axios errors
      return {
        data: null,
        error: "An unexpected error occurred",
        status: 500,
      };
    }
  }
};

export { createRequest };
