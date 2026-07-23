import { isDefined } from "@/lib/is-defined";

export function toSafeObject(value: unknown): unknown {
  if (!isDefined(value) || typeof value !== "object") {
    return value;
  }
  if (value instanceof EventTarget) {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map((item) => toSafeObject(item));
  }

  const result: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(value)) {
    if (typeof nested === "function") {
      continue;
    }
    result[key] = toSafeObject(nested);
  }
  return result;
}
