import type {Flags, ParsedFlags} from '../schema'

import {BASE_FLAGS_DEFAULTS} from './base'
import {BATCH_REPORTING_FLAGS_DEFAULTS} from './batch-reporting'
import {GENERATE_TARGET_FLAGS_DEFAULTS} from './generate-target'

export const LCP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  ...BATCH_REPORTING_FLAGS_DEFAULTS,
  registerOnVisibilityChange: false,
  removeElement: false,
  imgDelay: 500,
  imgHidden: false,
} as const satisfies Flags

export type LcpFlags = ParsedFlags<typeof LCP_FLAGS_DEFAULTS>
