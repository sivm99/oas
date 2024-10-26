type User = {
  username: string;
  name: string;
  email: string;
  emailVerified: boolean;
  aliasCount: number;
  destinationCount: number;
  avatar?: string;
};

type Rule = {
  ruleId: string;
  username: string;
  aliasEmail: string;
  destinationEmail: string;
  active: boolean;
  name?: string;
  comment?: string;
};

type Destination = {
  destinationID: string;
  username: string;
  destinationEmail: string;
  domain: string;
  verified: boolean;
};

type ResponseObject<T = User | Rule | Rule[] | Destination | Destination[]> = {
  status: "success" | "fail" | "error";
  message: string;
  data: T;
};

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type DataObject = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  currentPassword?: string;
  passwordConfirm?: string;
  aliasEmail?: string;
  destinationEmail?: string;
  domain?: string;
  comment?: string;
};

type RequestResult = {
  data: ResponseObject | null;
  error: string | null;
  status: number;
};

export type {
  User,
  Rule,
  Destination,
  ResponseObject,
  HttpMethod,
  DataObject,
  RequestResult,
};
