import type {Flags, ParsedFlags} from '../schema'

import {BASE_FLAGS_DEFAULTS} from './base'
import {BATCH_REPORTING_FLAGS_DEFAULTS} from './batch-reporting'
import {GENERATE_TARGET_FLAGS_DEFAULTS} from './generate-target'

export const CLS_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  noLayoutShifts: false,
  imgHidden: false,
  imgHidden2: false,
} as const satisfies Flags

export type ClsFlags = ParsedFlags<typeof CLS_FLAGS_DEFAULTS>
