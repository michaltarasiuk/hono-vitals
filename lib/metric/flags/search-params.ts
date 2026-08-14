import type {Flags} from './schema'

export function isNonDefaultFlag(
  value: Flags[string],
  defaultValue: Flags[string] | undefined,
) {
  return value !== false && value !== defaultValue
}

export function flagsToSearchParams(flags: Flags, defaults: Flags = {}) {
  return new URLSearchParams(
    Object.entries(flags)
      .filter(([key, value]) => isNonDefaultFlag(value, defaults[key]))
      .map(([key, value]) => [key, String(value)]),
  )
}
