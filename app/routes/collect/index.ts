import {zValidator} from '@hono/zod-validator';
import {Hono} from 'hono';
import {HTTPException} from 'hono/http-exception';

import {CollectBodySchema} from '@/lib/collect/body';
import {deleteMetrics, insertMetrics} from '@/lib/db/metrics';

async function run(message: string, action: () => Promise<void>) {
  try {
    await action();
  } catch (cause) {
    console.error(message, cause);

    throw new HTTPException(500, {
      message,
      cause: cause as Error,
    });
  }
}

const collectRoutes = new Hono()
  .post('/', zValidator('json', CollectBodySchema), async (c) => {
    const {metrics} = c.req.valid('json');

    await run('Failed to collect metrics', () => insertMetrics(metrics));

    return c.body(null, 204);
  })
  .delete('/', async (c) => {
    await run('Failed to clear metrics', () => deleteMetrics());

    return c.body(null, 204);
  });

export type CollectRoutes = typeof collectRoutes;

export default collectRoutes;
