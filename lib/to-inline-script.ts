export function toInlineScript(fn: () => void) {
  return `(${fn.toString()})();`;
}
