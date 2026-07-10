import * as z from "zod";
import { BaseMetricFlagsSchema } from "./shared";

export const InpFlagsSchema = BaseMetricFlagsSchema;

export type InpFlags = z.infer<typeof InpFlagsSchema>;
