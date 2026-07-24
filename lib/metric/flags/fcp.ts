import type { Flags } from "./schema";

import { BASE_FLAGS_DEFAULTS } from "./defaults";
import { type ParsedFlags } from "./schema";

export const FCP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
} as const satisfies Flags;

export type FcpFlags = ParsedFlags<typeof FCP_FLAGS_DEFAULTS>;
