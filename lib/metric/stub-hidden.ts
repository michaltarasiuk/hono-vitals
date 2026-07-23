function applyHiddenPageStub() {
  Object.defineProperty(document, "visibilityState", {
    value: "hidden",
    configurable: true,
  });

  const nativeGetEntriesByType = window.performance.getEntriesByType.bind(
    window.performance,
  );

  window.performance.getEntriesByType = (type: string) => {
    const [...entries] = nativeGetEntriesByType(type);
    if (type === "visibility-state" && entries.length > 0) {
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

export const HIDDEN_PAGE_STUB_SCRIPT = `(${applyHiddenPageStub.toString()})();`;
