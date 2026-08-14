import type {Flags} from './schema'

import {flagsToSearchParams} from './search-params'

export function navigateWithFlags(flags: Flags, defaults: Flags) {
  const url = new URL(location.href)
  const nonDefault = flagsToSearchParams(flags, defaults)

  for (const key of Object.keys(flags)) {
    url.searchParams.delete(key)
  }
  for (const [key, value] of nonDefault) {
    url.searchParams.set(key, value)
  }

  location.assign(url)
}
