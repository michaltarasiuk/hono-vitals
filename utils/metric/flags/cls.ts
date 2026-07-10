import * as z from "zod";

import { queryBoolean } from "./coerce";
import { BaseMetricFlagsSchema } from "./shared";

export const ClsFlagsSchema = BaseMetricFlagsSchema.extend({
  noLayoutShifts: queryBoolean,
  imgHidden: queryBoolean,
  img2Hidden: queryBoolean,
});

export type ClsFlags = z.infer<typeof ClsFlagsSchema>;
