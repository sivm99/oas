import { Destination, ResponseObject, Rule, User } from "./types";

function isUserResponse(
  response: ResponseObject,
): response is ResponseObject<User> {
  return (
    "status" in response &&
    "message" in response &&
    "data" in response &&
    typeof response.data === "object" &&
    response.data !== null &&
    "username" in response.data &&
    "name" in response.data &&
    "email" in response.data &&
    "isEmailVerified" in response.data &&
    "aliasCount" in response.data &&
    "destinationCount" in response.data
  );
}

function isRulesResponse(
  response: ResponseObject,
): response is ResponseObject<Rule[]> {
  return (
    "status" in response &&
    "message" in response &&
    "data" in response &&
    Array.isArray(response.data) &&
    response.data.every(
      (rule) =>
        typeof rule === "object" &&
        rule !== null &&
        "ruleId" in rule &&
        "username" in rule &&
        "aliasEmail" in rule &&
        "destinationEmail" in rule &&
        "isActive" in rule,
    )
  );
}

function isDestinationsResponse(
  response: ResponseObject,
): response is ResponseObject<Destination[]> {
  return (
    "status" in response &&
    "message" in response &&
    "data" in response &&
    Array.isArray(response.data) &&
    response.data.every(
      (destination) =>
        typeof destination === "object" &&
        destination !== null &&
        "destinationId" in destination &&
        "username" in destination &&
        "destinationEmail" in destination &&
        "domain" in destination &&
        "isVerified" in destination,
    )
  );
}

export { isUserResponse, isRulesResponse, isDestinationsResponse };
