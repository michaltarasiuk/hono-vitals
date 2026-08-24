import {uppercaseFirst} from '@/lib/uppercase-first';

export function formatMetricRating(rating: string) {
  return uppercaseFirst(rating.replaceAll('-', ' '));
}
