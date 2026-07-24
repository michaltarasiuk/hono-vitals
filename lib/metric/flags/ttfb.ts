import type { Flags } from "./schema";

import { BASE_FLAGS_DEFAULTS } from "./defaults";
import { type ParsedFlags } from "./schema";

export const TTFB_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
  responseStart: 0,
} as const satisfies Flags;

export type TtfbFlags = ParsedFlags<typeof TTFB_FLAGS_DEFAULTS>;
