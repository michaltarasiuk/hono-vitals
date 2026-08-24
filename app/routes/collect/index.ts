import {zValidator} from '@hono/zod-validator';
import {Hono} from 'hono';

import {CollectBodySchema} from '@/lib/collect/body';
import {deleteMetrics, insertMetrics} from '@/lib/db/metrics';

const collectRoutes = new Hono()
  .post('/', zValidator('json', CollectBodySchema), async (c) => {
    const {metrics} = c.req.valid('json');

    await insertMetrics(metrics);

    return c.body(null, 204);
  })
  .delete('/', async (c) => {
    await deleteMetrics();

    return c.body(null, 204);
  });

export type CollectRoutes = typeof collectRoutes;

export default collectRoutes;
