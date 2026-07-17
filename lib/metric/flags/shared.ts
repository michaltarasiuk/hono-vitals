import * as z from "zod";

import { queryBoolean, queryNumberDefault } from "./coerce";

export const BaseMetricFlagsSchema = z.object({
  delayDCL: queryNumberDefault(0),
  delayLoad: queryNumberDefault(0),
  renderBlocking: queryNumberDefault(0),
  reportAllChanges: queryBoolean,
  doubleCall: queryBoolean,
  reportAllChanges2: queryBoolean,
  lazyLoad: queryBoolean,
  loadAfterInput: queryBoolean,
  hidden: queryBoolean,
  wasDiscarded: queryBoolean,
  invisible: queryBoolean,
  prerender: queryBoolean,
  attribution: queryBoolean,
});

export type BaseMetricFlags = z.infer<typeof BaseMetricFlagsSchema>;

export const GenerateTargetFlagsSchema = z.object({
  generateTarget: queryBoolean,
  generateTarget2: queryBoolean,
});

export type GenerateTargetFlags = z.infer<typeof GenerateTargetFlagsSchema>;

export const BatchReportingFlagsSchema = z.object({
  batchReporting: queryBoolean,
});
