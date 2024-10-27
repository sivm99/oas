import { ResponseObject, User } from "./types";

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

export { isUserResponse };
