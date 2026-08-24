import {isDefined} from '@/lib/is-defined';

export function overrideResponseStart(responseStart: number) {
  const [navEntry] = performance.getEntriesByType('navigation');
  if (isDefined(navEntry)) {
    Object.defineProperty(navEntry, 'responseStart', {value: responseStart});
  }
}
