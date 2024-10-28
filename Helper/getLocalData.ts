import { Rule } from "./types";

export async function getLocalRules() {
  const localRules = localStorage.getItem("rules");
  if (!localRules) return;
  const parsedRules = JSON.parse(localRules) as Rule[];
  return parsedRules;
}

export async function getLocalDestinations() {
  const localDestinations = localStorage.getItem("destinations");
  if (!localDestinations) return;
  const parsedDestinations = JSON.parse(localDestinations);
  return parsedDestinations;
}
