import type { MetricName } from "@/lib/collect/metric-schema";
import type { Flags } from "@/lib/metric/flags/schema";

export function metricHref(
  metric: MetricName,
  ...rest: Parameters<typeof flagsToQueryString>
) {
  const queryString = flagsToQueryString(...rest);
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
