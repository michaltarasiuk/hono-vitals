import type * as z from "zod";

export function schemaDefaults<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
): z.infer<T> {
  return schema.parse({});
}
