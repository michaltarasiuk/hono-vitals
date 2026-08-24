import * as z from 'zod';

import {MetricSchema} from '@/lib/metric/schema';

export const CollectBodySchema = z.object({
  metrics: z.array(MetricSchema).min(1),
});

export type CollectBody = z.infer<typeof CollectBodySchema>;
