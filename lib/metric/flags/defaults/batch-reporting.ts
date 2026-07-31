import type { Flags } from "../schema";

export const BATCH_REPORTING_FLAGS_DEFAULTS = {
  batchReporting: false,
} as const satisfies Flags;
