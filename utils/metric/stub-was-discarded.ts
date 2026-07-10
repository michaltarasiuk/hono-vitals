export function applyWasDiscardedStub() {
  if (!document.wasDiscarded) {
    Object.defineProperty(document, "wasDiscarded", {
      value: true,
      configurable: true,
    });
  }
}

export const WAS_DISCARDED_STUB_SCRIPT = `(${applyWasDiscardedStub.toString()})();`;
