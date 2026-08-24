import {flagsToSearchParams} from './search-params';

import type {Flags} from './schema';

export function navigateWithFlags(flags: Flags, defaults: Flags) {
  const url = new URL(location.href);
  url.search = flagsToSearchParams(flags, defaults).toString();
  location.assign(url);
}
