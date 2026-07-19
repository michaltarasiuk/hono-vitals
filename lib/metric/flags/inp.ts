import * as z from "zod";

import { queryBoolean, queryNumberDefault } from "./coerce";
import {
  BaseMetricFlagsSchema,
  BatchReportingFlagsSchema,
  GenerateTargetFlagsSchema,
} from "./shared";

export const InpFlagsSchema = BaseMetricFlagsSchema.extend({
  ...GenerateTargetFlagsSchema.shape,
  ...BatchReportingFlagsSchema.shape,
  includeProcessedEventEntries: queryBoolean,
  clickBlockingTime: queryNumberDefault(0),
  durationThreshold: queryNumberDefault(0),
  durationThreshold2: queryNumberDefault(0),
  keydownBlockingTime: queryNumberDefault(0),
  keyupBlockingTime: queryNumberDefault(0),
  mousedownBlockingTime: queryNumberDefault(0),
  mouseupBlockingTime: queryNumberDefault(0),
  pointerdownBlockingTime: queryNumberDefault(0),
  pointerupBlockingTime: queryNumberDefault(0),
});

export type InpFlags = z.infer<typeof InpFlagsSchema>;
