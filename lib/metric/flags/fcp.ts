import type { Flags } from "./serialize";

import { BASE_FLAGS_DEFAULTS } from "./defaults";
import { type WidenFlags } from "./schema";

export const FCP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
} as const satisfies Flags;

export type FcpFlags = WidenFlags<typeof FCP_FLAGS_DEFAULTS>;
