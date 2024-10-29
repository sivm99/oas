import axios, { AxiosError } from "axios";
import {
  DataObject,
  HttpMethod,
  RequestResult,
  ResponseObject,
} from "@/Helper/types";

console.log(`The backend  is ${process.env.BACKEND_HOST}`);

const BASE_URL = `${process.env.BACKEND_HOST}/api/v2`;

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // },
});

const createRequest = async (
  urlOrMethod: string | HttpMethod,
  tokenOrData?: string | DataObject,
  data?: DataObject,
): Promise<RequestResult> => {
  console.log("create request to api was called");
  try {
    let method: HttpMethod = "GET";
    let url: string;
    let requestData: DataObject | undefined;
    let token: string | undefined;

    // Determine if first param is URL or method
    if (typeof urlOrMethod === "string" && !urlOrMethod.includes("/")) {
      method = urlOrMethod as HttpMethod;
      url = tokenOrData as string;
      requestData = data;
    } else {
      url = urlOrMethod as string;
      token = tokenOrData as string;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await instance.request<ResponseObject>({
      method,
      url,
      data: requestData,
      headers,
    });

    return {
      data: response.data,
      error: null,
      status: response.status,
      cookies: response.headers["set-cookie"]?.join("; "),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ResponseObject>;
      if (axiosError.response) {
        return {
          data: axiosError.response.data,
          error: axiosError.response.data.message || "An error occurred",
          status: axiosError.response.status,
          cookies: axiosError.response.headers["set-cookie"]?.join("; "),
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
