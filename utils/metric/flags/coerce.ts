import * as z from "zod";

export const queryBoolean = z.coerce.boolean().default(false);

export function queryNumberDefault(
  defaultValue: number,
): z.ZodDefault<z.ZodCoercedNumber>;
export function queryNumberDefault(): z.ZodOptional<z.ZodCoercedNumber>;
export function queryNumberDefault(defaultValue?: number) {
  const schema = z.coerce.number();
  return defaultValue === undefined
    ? schema.optional()
    : schema.default(defaultValue);
}
