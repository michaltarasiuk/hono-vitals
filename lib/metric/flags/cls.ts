import type { Flags } from "./schema";

import {
  BASE_FLAGS_DEFAULTS,
  BATCH_REPORTING_FLAGS_DEFAULTS,
  GENERATE_TARGET_FLAGS_DEFAULTS,
} from "./defaults";
import { type ParsedFlags } from "./schema";

export const CLS_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  noLayoutShifts: false,
  imgHidden: false,
  img2Hidden: false,
} as const satisfies Flags;

export type ClsFlags = ParsedFlags<typeof CLS_FLAGS_DEFAULTS>;
