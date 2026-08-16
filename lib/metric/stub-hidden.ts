import {toInlineScript} from '@/lib/to-inline-script'

function applyHiddenVisibilityStub() {
  Object.defineProperty(document, 'visibilityState', {
    value: 'hidden',
    configurable: true,
  })

  const getEntriesByType = performance.getEntriesByType.bind(performance)

  performance.getEntriesByType = (type: string) => {
    const entries = [...getEntriesByType(type)]

    if (type !== 'visibility-state') {
      return entries
    }

    const hiddenEntry = {
      name: 'hidden',
      entryType: 'visibility-state',
      startTime: 0,
      duration: 0,
    } as PerformanceEntry

    if (entries.length === 0) {
      return [hiddenEntry]
    }

    const patched = [...entries]
    patched[0] = hiddenEntry
    return patched
  }

  function restore() {
    Reflect.deleteProperty(document, 'visibilityState')
    performance.getEntriesByType = getEntriesByType
    document.removeEventListener('visibilitychange', onVisibilityChange, true)
  }

  function onVisibilityChange(event: Event) {
    if (event.isTrusted) {
      restore()
    }
  }

  document.addEventListener('visibilitychange', onVisibilityChange, true)
}

export const HIDDEN_STUB_SCRIPT = toInlineScript(applyHiddenVisibilityStub)
