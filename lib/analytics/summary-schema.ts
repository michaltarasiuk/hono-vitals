import * as z from "zod";

import { METRIC_NAMES, type MetricName } from "@/lib/collect/schema";

export const MetricSummarySchema = z.object({
  name: z.enum(METRIC_NAMES),
  count: z.number(),
  avg: z.number(),
  p75: z.number(),
  ratings: z.object({
    good: z.number(),
    needsImprovement: z.number(),
    poor: z.number(),
  }),
});

export type MetricSummary = z.infer<typeof MetricSummarySchema>;
