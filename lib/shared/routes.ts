const METRIC_SLUGS = ["cls", "fcp", "inp", "lcp", "ttfb"] as const;

export type MetricSlug = (typeof METRIC_SLUGS)[number];

export const ROUTES = [
  { href: "/", label: "Metrics" },
  ...METRIC_SLUGS.map((slug) => ({
    href: `/metric/${slug}`,
    label: slug.toUpperCase(),
  })),
] as const;
