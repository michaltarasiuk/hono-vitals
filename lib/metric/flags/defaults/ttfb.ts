import type { Flags, ParsedFlags } from "../schema";

import { BASE_FLAGS_DEFAULTS } from "./base";
import { BATCH_REPORTING_FLAGS_DEFAULTS } from "./batch-reporting";

export const TTFB_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
  responseStart: 0,
} as const satisfies Flags;

export type TtfbFlags = ParsedFlags<typeof TTFB_FLAGS_DEFAULTS>;
