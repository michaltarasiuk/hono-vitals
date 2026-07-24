import * as z from "zod";

import { assertNever } from "@/lib/assert-never";

import type { FlagValue, Flags } from "./serialize";

export function queryBooleanDefault(defaultValue: boolean) {
  return z.coerce.boolean().prefault(defaultValue);
}

export function queryNumberDefault(defaultValue: number) {
  return z.coerce.number().prefault(defaultValue);
}

export type WidenFlags<T extends Flags> = {
  [K in keyof T]: T[K] extends boolean ? boolean : number;
};

export function flagsSchema<T extends Flags>(
  defaults: T,
): z.ZodType<WidenFlags<T>> {
  const shape: Record<string, z.ZodType<FlagValue>> = {};

  for (const [key, value] of Object.entries(defaults)) {
    switch (typeof value) {
      case "boolean":
        shape[key] = queryBooleanDefault(value);
        break;
      case "number":
        shape[key] = queryNumberDefault(value);
        break;
      default:
        assertNever(value);
    }
  }

  return z.object(shape) as z.ZodType<WidenFlags<T>>;
}
