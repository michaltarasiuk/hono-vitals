import { toSafeObject } from "./to-safe-object";

export function reportMetric(metric: object) {
  const body = JSON.stringify({ metric: toSafeObject(metric) });

  navigator.sendBeacon(
    "/collect",
    new Blob([body], { type: "application/json" }),
  );
}
