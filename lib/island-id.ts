/**
 * Returns a stable DOM id for Honox islands.
 *
 * Honox SSR and island hydration use different React trees, so `useId()`
 * values do not match. Use this for `id`, `htmlFor`, and `triggerId`
 * instead of `useId()`.
 */
export function islandId(id: string) {
  return `island-${id}`
}
