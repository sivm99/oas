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
    "name" in response.data
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
        "active" in rule,
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
        "destinationID" in destination &&
        "username" in destination &&
        "destinationEmail" in destination &&
        "domain" in destination &&
        "verified" in destination,
    )
  );
}

export { isUserResponse, isRulesResponse, isDestinationsResponse };
