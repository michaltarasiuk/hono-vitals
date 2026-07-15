export function afterLoad() {
  return new Promise<void>((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", () => resolve());
    }
  });
}

export function afterElementsRendered() {
  return new Promise<void>((resolve) => {
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        if (PerformanceObserver.supportedEntryTypes.includes("element")) {
          const nodes = new Set([
            ...document.querySelectorAll("[elementtiming]:not([hidden])"),
          ]);
          if (nodes.size === 0) {
            resolve();
            return;
          }
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if ("element" in entry && entry.element instanceof Element) {
                nodes.delete(entry.element);
              }
            }
            if (nodes.size === 0) {
              resolve();
            }
          }).observe({ type: "element", buffered: true });
        } else {
          void afterLoad().then(() => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => resolve());
            });
          });
        }
      },
      true,
    );
  });
}

export function afterFirstInput() {
  return new Promise<void>((resolve) => {
    new PerformanceObserver(() => resolve()).observe({
      type: "first-input",
      buffered: true,
    });
  });
}
