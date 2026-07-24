import type { Flags } from "./serialize";

import { type WidenFlags } from "./coerce";
import { BASE_METRIC_FLAGS_DEFAULTS } from "./shared";

export const TTFB_FLAGS_DEFAULTS = {
  ...BASE_METRIC_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
  responseStart: 0,
} as const satisfies Flags;

export type TtfbFlags = WidenFlags<typeof TTFB_FLAGS_DEFAULTS>;
