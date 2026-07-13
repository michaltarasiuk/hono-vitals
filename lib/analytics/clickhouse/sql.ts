import dedent from "dedent";

export const CREATE_METRICS_TABLE_SQL = dedent`
  CREATE TABLE IF NOT EXISTS metrics (
    metric_id String,
    name LowCardinality(String),
    value Float64,
    delta Float64,
    rating LowCardinality(String),
    navigation_type LowCardinality(String),
    collected_at DateTime64(3) DEFAULT now64(3)
  ) ENGINE = MergeTree()
  ORDER BY (name, collected_at);
`;

export const METRICS_SUMMARY_SQL = dedent`
  SELECT
    name,
    count() AS count,
    avg(value) AS avg,
    quantile(0.75)(value) AS p75,
    countIf(rating = 'good') AS good,
    countIf(rating = 'needs-improvement') AS needs_improvement,
    countIf(rating = 'poor') AS poor
  FROM metrics
  GROUP BY name
  ORDER BY name
`;
