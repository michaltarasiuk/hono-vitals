import * as z from "zod";

export const queryBoolean = z.coerce.boolean().default(false);

export const queryNumberDefault = (defaultValue: number) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce.number().default(defaultValue),
  );
