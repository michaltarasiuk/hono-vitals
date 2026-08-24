import {uppercaseFirst} from '@/lib/uppercase-first';

import type {MetricRating} from '@/lib/metric/schema';

export function formatMetricRating(rating: MetricRating) {
  return uppercaseFirst(rating.replaceAll('-', ' '));
}
