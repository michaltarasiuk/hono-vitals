export function overrideResponseStart(responseStart: number) {
  const navEntry = performance.getEntriesByType("navigation")[0];
  if (navEntry) {
    Object.defineProperty(navEntry, "responseStart", {
      value: responseStart,
    });
  }
}
