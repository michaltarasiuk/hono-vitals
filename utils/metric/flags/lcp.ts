import * as z from "zod";

import { queryBoolean } from "./coerce";
import { BaseMetricFlagsSchema } from "./shared";

export const LcpFlagsSchema = BaseMetricFlagsSchema.extend({
  imgHidden: queryBoolean,
});

export type LcpFlags = z.infer<typeof LcpFlagsSchema>;
