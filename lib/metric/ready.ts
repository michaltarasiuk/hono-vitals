export function afterLoad() {
  if (document.readyState === 'complete') {
    return Promise.resolve()
  }
  return new Promise<void>((resolve) =>
    addEventListener('load', () => resolve()),
  )
}

export function afterElementsRendered() {
  return new Promise<void>((resolve) => {
    function onDomContentLoaded() {
      if (!PerformanceObserver.supportedEntryTypes.includes('element')) {
        void afterLoad().then(() =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        )
        return
      }

      const nodes = new Set(
        document.querySelectorAll('[elementtiming]:not([hidden])'),
      )

      if (nodes.size === 0) {
        resolve()
        return
      }

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ('element' in entry && entry.element instanceof Element) {
            nodes.delete(entry.element)
          }
        }
        if (nodes.size === 0) {
          resolve()
        }
      }).observe({type: 'element', buffered: true})
    }

    // Islands hydrate from an async script, so DOMContentLoaded has often
    // already fired by the time this runs; `buffered: true` still replays
    // the element entries we missed.
    if (document.readyState === 'loading') {
      addEventListener('DOMContentLoaded', onDomContentLoaded, true)
      return
    }

    onDomContentLoaded()
  })
}

export function afterFirstInput() {
  return new Promise<void>((resolve) => {
    new PerformanceObserver(() => resolve()).observe({
      type: 'first-input',
      buffered: true,
    })
  })
}
