import type { Flags } from "./serialize";

import {
  BASE_FLAGS_DEFAULTS,
  BATCH_REPORTING_FLAGS_DEFAULTS,
  GENERATE_TARGET_FLAGS_DEFAULTS,
} from "./defaults";
import { type WidenFlags } from "./schema";

export const CLS_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  noLayoutShifts: false,
  imgHidden: false,
  img2Hidden: false,
} as const satisfies Flags;

export type ClsFlags = WidenFlags<typeof CLS_FLAGS_DEFAULTS>;
