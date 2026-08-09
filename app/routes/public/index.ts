import {Hono} from 'hono'
import {serveStatic} from 'hono/bun'
import {HTTPException} from 'hono/http-exception'
import * as z from 'zod'

import {delay} from '@/lib/delay'
import {isDefined} from '@/lib/is-defined'

const DelayQuerySchema = z.object({
  delay: z.coerce.number().optional(),
})

const publicRoutes = new Hono()
  .use('*', async (c, next) => {
    const parsed = DelayQuerySchema.safeParse({
      delay: c.req.query('delay'),
    })

    if (!parsed.success) {
      throw new HTTPException(400, {
        message: 'Invalid delay query',
      })
    }

    const {delay: timeout} = parsed.data

    if (isDefined(timeout)) {
      await delay(timeout)
    }

    await next()
  })
  .use(
    '*',
    serveStatic({
      root: '.',
    }),
  )

export default publicRoutes
