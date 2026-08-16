import {zValidator} from '@hono/zod-validator'
import {Hono} from 'hono'
import {HTTPException} from 'hono/http-exception'

import {clearMetrics, insertMetrics} from '@/lib/analytics/metrics'
import {CollectBodySchema} from '@/lib/collect/body'

const collectRoutes = new Hono()
  .post('/', zValidator('json', CollectBodySchema), async (c) => {
    const {metrics} = c.req.valid('json')

    try {
      await insertMetrics(metrics)
    } catch (cause) {
      console.error('Failed to collect metrics', cause)
      throw new HTTPException(500, {
        message: 'Failed to collect metrics',
        cause: cause as Error,
      })
    }

    return c.body(null, 204)
  })
  .delete('/', async (c) => {
    try {
      await clearMetrics()
    } catch (cause) {
      console.error('Failed to clear metrics', cause)
      throw new HTTPException(500, {
        message: 'Failed to clear metrics',
        cause: cause as Error,
      })
    }

    return c.body(null, 204)
  })

export type CollectRoutes = typeof collectRoutes

export default collectRoutes
