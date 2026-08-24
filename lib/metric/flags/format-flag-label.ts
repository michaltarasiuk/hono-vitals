import {uppercaseFirst} from '@/lib/uppercase-first';

export function formatFlagLabel(key: string) {
  return uppercaseFirst(
    key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Za-z])(\d)/g, '$1 $2')
      .toLowerCase(),
  );
}
