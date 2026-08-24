import type {Flags, ParsedFlags} from './schema';

export const BASE_FLAGS_DEFAULTS = {
  attribution: false,
  batchReporting: false,
  deferLibraryLoad: false,
  delayDomContentLoaded: 0,
  delayLoad: 0,
  htmlHidden: false,
  loadAfterInput: false,
  prerender: false,
  renderBlocking: 0,
  reportAllChanges: false,
  reportAllChanges2: false,
  secondObserver: false,
  stubHidden: false,
  wasDiscarded: false,
} as const satisfies Flags;

export type BaseFlags = ParsedFlags<typeof BASE_FLAGS_DEFAULTS>;

export const GENERATE_TARGET_FLAGS_DEFAULTS = {
  generateTarget: false,
  generateTarget2: false,
} as const satisfies Flags;

export type GenerateTargetFlags = ParsedFlags<
  typeof GENERATE_TARGET_FLAGS_DEFAULTS
>;

const INP_REPORT_FLAGS_DEFAULTS = {
  durationThreshold: 40,
  durationThreshold2: 40,
  includeProcessedEventEntries: false,
} as const satisfies Flags;

export type InpReportFlags = ParsedFlags<typeof INP_REPORT_FLAGS_DEFAULTS>;

export const CLS_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  imgHidden: false,
  imgHidden2: false,
  noLayoutShifts: false,
} as const satisfies Flags;

export type ClsFlags = ParsedFlags<typeof CLS_FLAGS_DEFAULTS>;

export const FCP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
} as const satisfies Flags;

export type FcpFlags = ParsedFlags<typeof FCP_FLAGS_DEFAULTS>;

export const INP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
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

export const LCP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
  registerOnVisibilityChange: false,
  removeElement: false,
} as const satisfies Flags;

export type LcpFlags = ParsedFlags<typeof LCP_FLAGS_DEFAULTS>;

export const TTFB_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
  responseStart: 0,
} as const satisfies Flags;

export type TtfbFlags = ParsedFlags<typeof TTFB_FLAGS_DEFAULTS>;
