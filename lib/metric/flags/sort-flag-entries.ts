import type { Flags } from "./schema";

export function sortFlagEntries(flags: Flags) {
  return Object.entries(flags).sort(([keyA, a], [keyB, b]) => {
    const typeOrder =
      (typeof a === "boolean" ? 0 : 1) - (typeof b === "boolean" ? 0 : 1);
    if (typeOrder !== 0) {
      return typeOrder;
    }
    return keyA.localeCompare(keyB);
  });
}
