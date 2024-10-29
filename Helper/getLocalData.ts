import { Destination, Rule, User } from "./types";

export async function getLocalRules() {
  const localRules = localStorage.getItem("rules");
  if (!localRules) return;
  const parsedRules = JSON.parse(localRules) as Rule[];
  return parsedRules;
}

export async function getLocalDestinations() {
  const localDestinations = localStorage.getItem("destinations");
  if (!localDestinations) return;
  const parsedDestinations = JSON.parse(localDestinations) as Destination[];
  return parsedDestinations;
}

export async function getLocalToken() {
  const token = localStorage.getItem("token");
  return token;
}

export async function getLocalUser() {
  const localUser = localStorage.getItem("user");
  if (!localUser) return;
  const parsedLocalUser = JSON.parse(localUser) as User;
  return parsedLocalUser;
}
