import * as z from "zod";

export const dbNumber = z.coerce.number();

export async function queryRows<Schema extends z.ZodType>(
  schema: Schema,
  result: PromiseLike<unknown>,
): Promise<z.output<Schema>[]> {
  return z.array(schema).parse(await result);
}
