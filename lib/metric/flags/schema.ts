import * as z from 'zod';

export type FlagValue = boolean | number;

export type Flags = Record<string, FlagValue>;

const queryBoolean = z.stringbool({truthy: ['true'], falsy: ['false']});
const queryNumber = z.coerce.number();

export function queryBooleanDefault(defaultValue: boolean) {
  return queryBoolean.prefault(String(defaultValue));
}

export function queryNumberDefault(defaultValue: number) {
  return queryNumber.prefault(defaultValue);
}

export type ParsedFlags<T extends Flags> = {
  [K in keyof T]: T[K] extends boolean ? boolean : number;
};

export function flagsSchema<T extends Flags>(defaults: T) {
  const shape = Object.fromEntries(
    Object.entries(defaults).map(([key, value]) => [
      key,
      typeof value === 'boolean'
        ? queryBooleanDefault(value)
        : queryNumberDefault(value),
    ]),
  );

  return z.object(shape) as z.ZodType<ParsedFlags<T>>;
}
