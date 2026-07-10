import * as z from "zod";

import { queryBoolean, queryNumberDefault } from "./coerce";
import { BaseMetricFlagsSchema } from "./shared";

export const LcpFlagsSchema = BaseMetricFlagsSchema.extend({
  imgDelay: queryNumberDefault(500),
  imgHidden: queryBoolean,
});

export type LcpFlags = z.infer<typeof LcpFlagsSchema>;
