import {BASE_FLAGS_DEFAULTS} from './base'
import {GENERATE_TARGET_FLAGS_DEFAULTS} from './generate-target'

import type {Flags, ParsedFlags} from '../schema'

export const CLS_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  ...GENERATE_TARGET_FLAGS_DEFAULTS,
  imgHidden: false,
  imgHidden2: false,
  noLayoutShifts: false,
} as const satisfies Flags

export type ClsFlags = ParsedFlags<typeof CLS_FLAGS_DEFAULTS>
