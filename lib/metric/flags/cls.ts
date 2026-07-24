import type { Flags } from "./serialize";

import { type WidenFlags } from "./coerce";
import {
  BASE_METRIC_FLAGS_DEFAULTS,
  BATCH_REPORTING_FLAGS_DEFAULTS,
  GENERATE_TARGET_FLAGS_DEFAULTS,
} from "./shared";

export const CLS_FLAGS_DEFAULTS = {
  ...BASE_METRIC_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  noLayoutShifts: false,
  imgHidden: false,
  img2Hidden: false,
} as const satisfies Flags;

export type ClsFlags = WidenFlags<typeof CLS_FLAGS_DEFAULTS>;
