import type {Flags, ParsedFlags} from '../schema'

import {BASE_FLAGS_DEFAULTS} from './base'
import {GENERATE_TARGET_FLAGS_DEFAULTS} from './generate-target'

const INP_REPORT_FLAGS_DEFAULTS = {
  durationThreshold: 40,
  durationThreshold2: 40,
  includeProcessedEventEntries: false,
} as const satisfies Flags

export type InpReportFlags = ParsedFlags<typeof INP_REPORT_FLAGS_DEFAULTS>

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
} as const satisfies Flags

export type InpFlags = ParsedFlags<typeof INP_FLAGS_DEFAULTS>
