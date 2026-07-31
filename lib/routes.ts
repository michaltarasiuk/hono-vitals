export const ROUTES = [
  { label: "Metrics", href: "/" },
  { label: "CLS", href: "/metric/cls" },
  { label: "FCP", href: "/metric/fcp" },
  { label: "INP", href: "/metric/inp" },
  { label: "LCP", href: "/metric/lcp" },
  { label: "TTFB", href: "/metric/ttfb" },
] as const;

export type Route = (typeof ROUTES)[number];

export function isActiveHref(href: Route["href"], path: string) {
  return href === path;
}

export function getActiveRoute(path: string) {
  return ROUTES.find(({ href }) => isActiveHref(href, path)) ?? ROUTES[0];
}
