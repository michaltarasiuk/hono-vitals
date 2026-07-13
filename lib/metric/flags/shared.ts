import * as z from "zod";

import { queryBoolean, queryNumberDefault } from "./coerce";

export const BaseMetricFlagsSchema = z.object({
  delayDCL: queryNumberDefault(0),
  delayLoad: queryNumberDefault(0),
  renderBlocking: queryNumberDefault(0),
  reportAllChanges: queryBoolean,
  generateTarget: queryBoolean,
  includeProcessedEventEntries: queryBoolean,
  doubleCall: queryBoolean,
  reportAllChanges2: queryBoolean,
  generateTarget2: queryBoolean,
  lazyLoad: queryBoolean,
  loadAfterInput: queryBoolean,
  batchReporting: queryBoolean,
  registerOnVisibilityChange: queryBoolean,
  removeElement: queryBoolean,
  hidden: queryBoolean,
  wasDiscarded: queryBoolean,
  invisible: queryBoolean,
  prerender: queryBoolean,
  attribution: queryBoolean,
});

export type BaseMetricFlags = z.infer<typeof BaseMetricFlagsSchema>;
