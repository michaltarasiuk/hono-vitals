import type { Flags, ParsedFlags } from "../schema";

export const BASE_FLAGS_DEFAULTS = {
  delayDomContentLoaded: 0,
  delayLoad: 0,
  renderBlocking: 0,
  reportAllChanges: false,
  secondObserver: false,
  reportAllChanges2: false,
  deferLibraryLoad: false,
  loadAfterInput: false,
  stubHidden: false,
  wasDiscarded: false,
  htmlHidden: false,
  prerender: false,
  attribution: false,
} as const satisfies Flags;

export type BaseFlags = ParsedFlags<typeof BASE_FLAGS_DEFAULTS>;
