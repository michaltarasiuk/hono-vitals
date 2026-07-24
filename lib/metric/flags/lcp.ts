import type { Flags } from "./serialize";

import {
  BASE_FLAGS_DEFAULTS,
  BATCH_REPORTING_FLAGS_DEFAULTS,
  GENERATE_TARGET_FLAGS_DEFAULTS,
} from "./defaults";
import { type WidenFlags } from "./schema";

export const LCP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  registerOnVisibilityChange: false,
  removeElement: false,
  imgDelay: 500,
  imgHidden: false,
} as const satisfies Flags;

export type LcpFlags = WidenFlags<typeof LCP_FLAGS_DEFAULTS>;
