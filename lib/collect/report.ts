export function reportMetric(metric: object) {
  const body = JSON.stringify({ metric }, replacer);

  navigator.sendBeacon(
    "/collect",
    new Blob([body], { type: "application/json" }),
  );
}

function replacer(_key: string, value: unknown) {
  if (typeof value === "function") {
    return;
  } else if (value instanceof EventTarget) {
    return String(value);
  }
  return value;
}
