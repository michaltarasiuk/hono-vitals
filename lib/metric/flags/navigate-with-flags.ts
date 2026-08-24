import {isNonDefaultFlag} from './search-params'

import type {Flags} from './schema'

export function navigateWithFlags(flags: Flags, defaults: Flags) {
  const url = new URL(location.href)

  for (const [key, value] of Object.entries(flags)) {
    if (isNonDefaultFlag(value, defaults[key])) {
      url.searchParams.set(key, String(value))
    } else {
      url.searchParams.delete(key)
    }
  }

  location.assign(url)
}
