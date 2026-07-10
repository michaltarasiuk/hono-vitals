import { assertNever } from "@/utils/assert-never";

export type FlagValue = boolean | number;

export function applyFlags(
  flags: Record<string, FlagValue>,
  defaults: Record<string, FlagValue>,
): void {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(flags)) {
    const defaultValue = defaults[key];
    switch (typeof value) {
      case "boolean":
        if (value) {
          url.searchParams.set(key, "true");
        } else {
          url.searchParams.delete(key);
        }
        break;
      case "number":
        if (value === defaultValue) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, String(value));
        }
        break;
      default:
        assertNever(value);
    }
  }
  window.location.assign(url);
}
