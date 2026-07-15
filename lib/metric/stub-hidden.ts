function applyHiddenPageStub() {
  Object.defineProperty(document, "visibilityState", {
    value: "hidden",
    configurable: true,
  });

  const originalGetEntriesByType = window.performance.getEntriesByType.bind(
    window.performance,
  );

  window.performance.getEntriesByType = function (type: string) {
    const entries = originalGetEntriesByType(type);
    if (type === "visibility-state" && entries.length > 0) {
      const modifiedEntries = [...entries];
      modifiedEntries[0] = {
        name: "hidden",
        entryType: "visibility-state",
        startTime: 0,
        duration: 0,
      } as PerformanceEntry;
      return modifiedEntries;
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
