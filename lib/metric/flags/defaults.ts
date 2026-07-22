import type * as z from "zod";

import type { Flags } from "./serialize";

export type { Flags };

export type FlagsSchema<T extends Flags = Flags> = z.ZodType<T>;

export function schemaDefaults<T extends Flags>(schema: FlagsSchema<T>): T {
  const result = schema.safeParse({});
  if (!result.success) {
    const keys = result.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Flags schema missing defaults for: ${keys}`);
  }
  return result.data;
}
