import type { Flags } from "./serialize";

import { type WidenFlags } from "./coerce";
import { BASE_METRIC_FLAGS_DEFAULTS } from "./shared";

export const FCP_FLAGS_DEFAULTS = {
  ...BASE_METRIC_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
} as const satisfies Flags;

export type FcpFlags = WidenFlags<typeof FCP_FLAGS_DEFAULTS>;
