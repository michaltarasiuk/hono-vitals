import * as z from "zod";

import { queryBoolean, queryNumberDefault } from "./coerce";
import { BaseMetricFlagsSchema } from "./shared";

export const TtfbFlagsSchema = BaseMetricFlagsSchema.extend({
  imgDelay: queryNumberDefault(500),
  imgHidden: queryBoolean,
  responseStart: queryNumberDefault(0),
});

export type TtfbFlags = z.infer<typeof TtfbFlagsSchema>;
