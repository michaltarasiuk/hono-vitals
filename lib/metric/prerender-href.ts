import type { MetricName } from "@/lib/collect/schema";
import type { FlagValue } from "@/lib/metric/flags/serialize";

function flagsToQueryString(
  flags: Record<string, FlagValue>,
  defaults: Record<string, FlagValue>,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(flags)) {
    const defaultValue = defaults[key];
    if (typeof value === "boolean") {
      if (value) {
        params.set(key, "true");
      }
    } else if (typeof value === "number" && value !== defaultValue) {
      params.set(key, String(value));
    }
  }
  return params.toString();
}

export function prerenderHref(
  metric: MetricName,
  flags: Record<string, FlagValue>,
  defaults: Record<string, FlagValue>,
) {
  const queryString = flagsToQueryString(flags, defaults);
  const base = `/metric/${metric.toLowerCase()}`;
  return queryString ? `${base}?${queryString}` : base;
}

export function speculationRulesJson(href: string) {
  return JSON.stringify({
    prerender: [{ urls: [href] }],
  });
}
