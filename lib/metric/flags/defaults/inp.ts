import type { Flags, ParsedFlags } from "../schema";

import { BASE_FLAGS_DEFAULTS } from "./base";
import { BATCH_REPORTING_FLAGS_DEFAULTS } from "./batch-reporting";
import { GENERATE_TARGET_FLAGS_DEFAULTS } from "./generate-target";
import { INP_REPORT_FLAGS_DEFAULTS } from "./inp-report";

export const INP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  ...INP_REPORT_FLAGS_DEFAULTS,
  clickBlockingTime: 0,
  keydownBlockingTime: 0,
  keyupBlockingTime: 0,
  mousedownBlockingTime: 0,
  mouseupBlockingTime: 0,
  pointerdownBlockingTime: 0,
  pointerupBlockingTime: 0,
} as const satisfies Flags;

export type InpFlags = ParsedFlags<typeof INP_FLAGS_DEFAULTS>;
