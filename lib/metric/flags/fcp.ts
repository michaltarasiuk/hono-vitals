import * as z from "zod";

import { queryBoolean, queryNumberDefault } from "./coerce";
import { BaseMetricFlagsSchema } from "./shared";

export const FcpFlagsSchema = BaseMetricFlagsSchema.extend({
  imgDelay: queryNumberDefault(500),
  imgHidden: queryBoolean,
});

export type FcpFlags = z.infer<typeof FcpFlagsSchema>;
