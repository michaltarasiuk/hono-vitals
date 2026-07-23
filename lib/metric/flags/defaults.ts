import type { ZodType } from "zod";

import type { Flags } from "./serialize";

export type FlagsSchema<T extends Flags = Flags> = ZodType<T>;

export function schemaDefaults<T extends Flags>(schema: FlagsSchema<T>) {
  const result = schema.safeParse({});
  if (!result.success) {
    const missing = result.error.issues
      .map((issue) => issue.path.join("."))
      .join(", ");
    throw new Error(`Flags schema missing defaults for: ${missing}`);
  }
  return result.data;
}
