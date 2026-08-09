import {hc} from 'hono/client'

import type {CollectRoutes} from '@/app/routes/collect'

export const COLLECT_PATH = '/collect'

export const collectClient = hc<CollectRoutes>(COLLECT_PATH)
