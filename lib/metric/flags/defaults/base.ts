import type {Flags, ParsedFlags} from '../schema';

export const BASE_FLAGS_DEFAULTS = {
  attribution: false,
  batchReporting: false,
  deferLibraryLoad: false,
  delayDomContentLoaded: 0,
  delayLoad: 0,
  htmlHidden: false,
  loadAfterInput: false,
  prerender: false,
  renderBlocking: 0,
  reportAllChanges: false,
  reportAllChanges2: false,
  secondObserver: false,
  stubHidden: false,
  wasDiscarded: false,
} as const satisfies Flags;

export type BaseFlags = ParsedFlags<typeof BASE_FLAGS_DEFAULTS>;
