import type { Flags, ParsedFlags } from "../schema";

import { BASE_FLAGS_DEFAULTS } from "./base";
import { BATCH_REPORTING_FLAGS_DEFAULTS } from "./batch-reporting";
import { GENERATE_TARGET_FLAGS_DEFAULTS } from "./generate-target";

export const INP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  includeProcessedEventEntries: false,
  clickBlockingTime: 0,
  durationThreshold: 40,
  durationThreshold2: 40,
  keydownBlockingTime: 0,
  keyupBlockingTime: 0,
  mousedownBlockingTime: 0,
  mouseupBlockingTime: 0,
  pointerdownBlockingTime: 0,
  pointerupBlockingTime: 0,
} as const satisfies Flags;

export type InpFlags = ParsedFlags<typeof INP_FLAGS_DEFAULTS>;
