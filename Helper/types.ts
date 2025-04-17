type User = {
  username: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  aliasCount: number;
  destinationCount: number;
  avatar?: string;
  plan?: "free" | "star" | "galaxy";
};

type Rule = {
  ruleId: number;
  username: string;
  aliasEmail: string;
  destinationEmail: string;
  isActive: boolean;
  name?: string;
  comment?: string;
};

type Destination = {
  destinationId: number;
  username: string;
  destinationEmail: string;
  domain: string;
  isVerified: boolean;
};

type PremiumTypes = {
  plan: User["plan"];
  months: 1 | 3 | 6 | 12;
};
type Subscription = {
  plan: PremiumTypes["plan"];
  price: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  status: string;
};
type ResponseObject<
  T =
    | User
    | Rule
    | Rule[]
    | Destination
    | Destination[]
    | Subscription
    | string,
> = {
  status: "success" | "fail" | "error";
  message: string;
  data: T;
};

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
type UrlEndpoints =
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
  | "/premium/init"
  | "/premium/subscribe"
  | "/user"
  | "/user/:username"
  | "/user/:username/logout"
  | "/user/:username/update-password"
  | "/user/:username/verify"
  | "/user/:username/verify/:token";

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
  avatar?: string;
  plan?: PremiumTypes["plan"];
  months?: PremiumTypes["months"];
  txnId?: string;
};

type RequestResult = {
  data: ResponseObject | null;
  error: string | null;
  status: number;
  cookies?: string;
};

export type {
  User,
  Rule,
  Destination,
  ResponseObject,
  HttpMethod,
  DataObject,
  RequestResult,
  UrlEndpoints,
  PremiumTypes,
  Subscription,
};
