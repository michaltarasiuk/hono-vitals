import type { Flags } from "./serialize";

import { type WidenFlags } from "./coerce";
import {
  BASE_METRIC_FLAGS_DEFAULTS,
  BATCH_REPORTING_FLAGS_DEFAULTS,
  GENERATE_TARGET_FLAGS_DEFAULTS,
} from "./shared";

export const INP_FLAGS_DEFAULTS = {
  ...BASE_METRIC_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  includeProcessedEventEntries: false,
  clickBlockingTime: 0,
  durationThreshold: 0,
  durationThreshold2: 0,
  keydownBlockingTime: 0,
  keyupBlockingTime: 0,
  mousedownBlockingTime: 0,
  mouseupBlockingTime: 0,
  pointerdownBlockingTime: 0,
  pointerupBlockingTime: 0,
} as const satisfies Flags;

export type InpFlags = WidenFlags<typeof INP_FLAGS_DEFAULTS>;
