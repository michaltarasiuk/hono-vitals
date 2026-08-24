import type {Flags} from './schema';

function typeRank(value: unknown) {
  return typeof value === 'boolean' ? 0 : 1;
}

export function sortFlagEntries(flags: Flags) {
  return Object.entries(flags).sort(
    ([ka, a], [kb, b]) => typeRank(a) - typeRank(b) || ka.localeCompare(kb),
  );
}
