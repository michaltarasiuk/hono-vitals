function stubHiddenVisibility() {
  Object.defineProperty(document, "visibilityState", {
    value: "hidden",
    configurable: true,
  });

  const originalGetEntriesByType =
    window.performance.getEntriesByType.bind(performance);

  window.performance.getEntriesByType = (type: string) => {
    const entries = [...originalGetEntriesByType(type)];
    if (type === "visibility-state" && entries[0]) {
      entries[0] = {
        name: "hidden",
        entryType: "visibility-state",
        startTime: 0,
        duration: 0,
      } as PerformanceEntry;
    }
    return entries;
  };

  window.addEventListener(
    "visibilitychange",
    (event) => {
      if (event.isTrusted) {
        Reflect.deleteProperty(document, "visibilityState");
      }
    },
    true,
  );
}

export const HIDDEN_STUB_SCRIPT = `(${stubHiddenVisibility.toString()})();`;
