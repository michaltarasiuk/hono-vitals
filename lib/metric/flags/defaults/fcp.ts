import {BASE_FLAGS_DEFAULTS} from './base';

import type {Flags, ParsedFlags} from '../schema';

export const FCP_FLAGS_DEFAULTS = {
  ...BASE_FLAGS_DEFAULTS,
  imgDelay: 500,
  imgHidden: false,
} as const satisfies Flags;

export type FcpFlags = ParsedFlags<typeof FCP_FLAGS_DEFAULTS>;
