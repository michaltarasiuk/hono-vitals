import type {Flags, ParsedFlags} from '../schema'

export const GENERATE_TARGET_FLAGS_DEFAULTS = {
  generateTarget: false,
  generateTarget2: false,
} as const satisfies Flags

export type GenerateTargetFlags = ParsedFlags<
  typeof GENERATE_TARGET_FLAGS_DEFAULTS
>
