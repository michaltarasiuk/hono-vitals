import * as z from "zod";

import { queryBoolean, queryNumberDefault } from "./coerce";
import {
  BaseMetricFlagsSchema,
  BatchReportingFlagsSchema,
  GenerateTargetFlagsSchema,
} from "./shared";

export const LcpFlagsSchema = BaseMetricFlagsSchema.extend({
  ...GenerateTargetFlagsSchema.shape,
  ...BatchReportingFlagsSchema.shape,
  registerOnVisibilityChange: queryBoolean,
  removeElement: queryBoolean,
  imgDelay: queryNumberDefault(500),
  imgHidden: queryBoolean,
});

export type LcpFlags = z.infer<typeof LcpFlagsSchema>;
