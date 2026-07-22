export const METRICS_TABLE = "metrics";

export const METRICS_COLUMNS = [
  "metric_id",
  "name",
  "value",
  "delta",
  "rating",
  "navigation_type",
] as const;

export type MetricsColumn = (typeof METRICS_COLUMNS)[number];
