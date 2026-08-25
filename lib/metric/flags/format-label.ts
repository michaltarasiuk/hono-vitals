import {capitalize} from '@/lib/utils/capitalize';

export function formatFlagLabel(key: string) {
  return capitalize(
    key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Za-z])(\d)/g, '$1 $2')
      .toLowerCase(),
  );
}
