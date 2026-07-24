import type { Flags } from "./serialize";

import { type WidenFlags } from "./coerce";

export const BASE_METRIC_FLAGS_DEFAULTS = {
  delayDCL: 0,
  delayLoad: 0,
  renderBlocking: 0,
  reportAllChanges: false,
  doubleCall: false,
  reportAllChanges2: false,
  lazyLoad: false,
  loadAfterInput: false,
  hidden: false,
  wasDiscarded: false,
  invisible: false,
  prerender: false,
  attribution: false,
} as const satisfies Flags;

export type BaseMetricFlags = WidenFlags<typeof BASE_METRIC_FLAGS_DEFAULTS>;

export const GENERATE_TARGET_FLAGS_DEFAULTS = {
  generateTarget: false,
  generateTarget2: false,
} as const satisfies Flags;

export type GenerateTargetFlags = WidenFlags<
  typeof GENERATE_TARGET_FLAGS_DEFAULTS
>;

export const BATCH_REPORTING_FLAGS_DEFAULTS = {
  batchReporting: false,
} as const satisfies Flags;
