import type * as z from "zod";

import type { Flags } from "./serialize";

export type { Flags };

export type FlagsSchema<T extends Flags = Flags> = z.ZodType<T>;

export function schemaDefaults<T extends Flags>(schema: FlagsSchema<T>): T {
  return schema.parse({});
}
