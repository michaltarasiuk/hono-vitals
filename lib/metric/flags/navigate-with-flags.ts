import type {Flags} from './schema'

export function navigateWithFlags(flags: Flags, defaults: Flags) {
  const url = new URL(location.href)

  for (const [key, value] of Object.entries(flags)) {
    const isDefault = value === false || value === defaults[key]
    if (isDefault) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, String(value))
    }
  }

  location.assign(url)
}
