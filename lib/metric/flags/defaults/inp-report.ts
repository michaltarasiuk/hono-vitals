import type {Flags, ParsedFlags} from '../schema'

export const INP_REPORT_FLAGS_DEFAULTS = {
  durationThreshold: 40,
  durationThreshold2: 40,
  includeProcessedEventEntries: false,
} as const satisfies Flags

export type InpReportFlags = ParsedFlags<typeof INP_REPORT_FLAGS_DEFAULTS>
