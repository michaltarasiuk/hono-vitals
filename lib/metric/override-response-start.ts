import { isDefined } from "@/lib/shared/is-defined";

export function overrideResponseStart(responseStart: number) {
  const navEntry = performance.getEntriesByType("navigation")[0];
  if (isDefined(navEntry)) {
    Object.defineProperty(navEntry, "responseStart", {
      value: responseStart,
    });
  }
}
