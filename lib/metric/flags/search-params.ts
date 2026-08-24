import {flagsSchema} from './schema';

import type {Flags} from './schema';

export function parseFlagsFromSearch<T extends Flags>(
  defaults: T,
  search = location.search,
) {
  const searchParams = new URLSearchParams(search);
  return flagsSchema(defaults).parse(Object.fromEntries(searchParams));
}

export function flagsToSearchParams(flags: Flags, defaults: Flags = {}) {
  return new URLSearchParams(
    Object.entries(flags)
      .filter(([k, v]) => isNonDefault(v, defaults[k]))
      .map(([k, v]) => [k, String(v)]),
  );
}

function isNonDefault(
  value: Flags[string],
  defaultValue: Flags[string] | undefined,
) {
  return value !== false && value !== defaultValue;
}
