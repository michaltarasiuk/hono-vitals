import { METRIC_NAMES } from "@/lib/collect/metric-schema";

export const ROUTES = [
  { label: "Metrics", href: "/" },
  ...METRIC_NAMES.map((name) => ({
    label: name,
    href: `/metric/${name.toLowerCase()}`,
  })),
] as const;

export type Route = (typeof ROUTES)[number];

export function isActiveHref(href: Route["href"], path: string) {
  return href === path;
}

export function getActiveRoute(path: string) {
  return ROUTES.find(({ href }) => isActiveHref(href, path)) ?? ROUTES[0];
}
