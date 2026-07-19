import { METRIC_NAMES } from "@/lib/collect/schema";

export const ROUTES = [
  { label: "Metrics", href: "/" },
  ...METRIC_NAMES.map((name) => ({
    label: name,
    href: `/metric/${name.toLowerCase()}`,
  })),
] as const;
