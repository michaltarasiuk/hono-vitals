const METRICS = ["cls", "fcp", "inp", "lcp", "ttfb"] as const;

export const ROUTES = [
  { label: "Metrics", href: "/" },
  ...METRICS.map((metric) => ({
    label: metric.toUpperCase(),
    href: `/metric/${metric}`,
  })),
];

export type Route = (typeof ROUTES)[number];

export function getActiveRoute(path: string) {
  return ROUTES.find(({ href }) => href === path) ?? ROUTES[0]!;
}
