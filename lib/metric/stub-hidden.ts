import {toInlineScript} from '@/lib/to-inline-script'

function stubHiddenVisibility() {
  Object.defineProperty(document, 'visibilityState', {
    value: 'hidden',
    configurable: true,
  })

  const original = performance.getEntriesByType.bind(performance)

  performance.getEntriesByType = (type: string) => {
    const entries = [...original(type)]
    if (type === 'visibility-state' && entries[0]) {
      entries[0] = Object.assign({} as PerformanceEntry, {
        name: 'hidden',
        entryType: 'visibility-state',
        startTime: 0,
        duration: 0,
      })
    }
    return entries
  }

  addEventListener(
    'visibilitychange',
    (event) => {
      if (event.isTrusted) {
        Reflect.deleteProperty(document, 'visibilityState')
      }
    },
    true,
  )
}

export const HIDDEN_STUB_SCRIPT = toInlineScript(stubHiddenVisibility)
