import {metricHref} from '@/lib/metric/href';
import {METRIC_NAMES} from '@/lib/metric/schema';

const HOME_ROUTE = {label: 'Metrics', href: '/'} as const;

export const ROUTES = [
  HOME_ROUTE,
  ...METRIC_NAMES.map((name) => ({
    label: name,
    href: metricHref(name),
  })),
];

export type Route = (typeof ROUTES)[number];

export function getActiveRoute(path: string) {
  return ROUTES.find(({href}) => href === path) ?? HOME_ROUTE;
}
