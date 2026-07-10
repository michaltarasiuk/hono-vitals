import * as z from "zod";
import { queryBoolean } from "./coerce";

export const BaseMetricFlagsSchema = z
  .object({
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
  })
  .partial();

export type BaseMetricFlags = z.infer<typeof BaseMetricFlagsSchema>;
