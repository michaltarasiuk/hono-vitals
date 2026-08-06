import type { MetricName } from "@/lib/collect/metric-schema";
import type { Flags } from "@/lib/metric/flags/schema";

export function metricHref(
  metric: MetricName,
  flags: Flags = {},
  defaults: Flags = {},
) {
  const params = buildNonDefaultParams(flags, defaults);
  const path = `/metric/${metric.toLowerCase()}`;
  return params.size > 0 ? `${path}?${params}` : path;
}

function buildNonDefaultParams(flags: Flags, defaults: Flags) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(flags)) {
    if (value === defaults[key]) continue;
    if (value === false) continue;
    params.set(key, String(value));
  }
  return params;
}
