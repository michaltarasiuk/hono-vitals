import * as z from "zod";

import { queryBoolean } from "./coerce";
import { BaseMetricFlagsSchema } from "./shared";

export const TtfbFlagsSchema = BaseMetricFlagsSchema.extend({
  imgHidden: queryBoolean,
});

export type TtfbFlags = z.infer<typeof TtfbFlagsSchema>;
