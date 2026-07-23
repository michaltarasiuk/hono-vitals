import { assertNever } from "@/lib/assert-never";

export type FlagValue = boolean | number;

export type Flags = Record<string, FlagValue>;

export function applyFlags(flags: Flags, defaults: Flags) {
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
