import { isDefined } from "@/lib/is-defined";

export function toSafeObject(oldObj: unknown) {
  if (!isDefined(oldObj) || typeof oldObj !== "object") {
    return oldObj;
  }
  if (oldObj instanceof EventTarget) {
    return oldObj.toString();
  }
  const newObj: Record<string, unknown> = {};
  for (const key in oldObj as Record<string, unknown>) {
    const value = (oldObj as Record<string, unknown>)[key];
    if (typeof value === "function") {
      continue;
    }
    newObj[key] = Array.isArray(value)
      ? value.map((item) => toSafeObject(item))
      : toSafeObject(value);
  }
  return newObj;
}
