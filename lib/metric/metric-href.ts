import type { MetricName } from "@/lib/collect/schema";
import type { Flags } from "@/lib/metric/flags/schema";

export function metricHref(metric: MetricName, flags: Flags, defaults: Flags) {
  const queryString = flagsToQueryString(flags, defaults);
  let href = `/metric/${metric.toLowerCase()}`;
  if (queryString) {
    href += `?${queryString}`;
  }
  return href;
}

function flagsToQueryString(flags: Flags, defaults: Flags) {
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
