import * as z from "zod";

export const queryBoolean = z.coerce.boolean().prefault(false);

export function queryNumberDefault(defaultValue: number) {
  return z.coerce.number().prefault(defaultValue);
}
