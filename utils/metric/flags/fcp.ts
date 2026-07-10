import * as z from "zod";
import { queryBoolean } from "./coerce";
import { BaseMetricFlagsSchema } from "./shared";

export const FcpFlagsSchema = BaseMetricFlagsSchema.extend({
  imgHidden: queryBoolean,
}).partial();

export type FcpFlags = z.infer<typeof FcpFlagsSchema>;
