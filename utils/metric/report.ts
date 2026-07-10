import { toSafeObject } from "./to-safe-object";

export function reportMetric(metric: object) {
  navigator.sendBeacon(
    "/collect",
    JSON.stringify({ metric: toSafeObject(metric) }),
  );
}
