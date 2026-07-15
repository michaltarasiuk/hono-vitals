import type { ReactNode } from "react";

import type { MetricSummary } from "@/lib/analytics/summary-schema";

import { formatMetricValue } from "@/lib/analytics/format-value";

function Root({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className ?? "MetricsSummary"}>{children}</div>;
}

function Title() {
  return <h1>Metrics</h1>;
}

function Lead({ totalSamples }: { totalSamples: number }) {
  return (
    <p className="MetricsSummaryLead">
      Summary across {totalSamples.toLocaleString()} collected samples.
    </p>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="MetricsCardGrid">{children}</div>;
}

function RatingBar({ summary }: { summary: MetricSummary }) {
  const { good, needsImprovement, poor } = summary.ratings;
  const total = good + needsImprovement + poor;

  if (total === 0) {
    return <div className="MetricsRatingBar MetricsRatingBar--empty" />;
  }

  const goodPct = (good / total) * 100;
  const needsPct = (needsImprovement / total) * 100;
  const poorPct = (poor / total) * 100;

  return (
    <div
      className="MetricsRatingBar"
      role="img"
      aria-label="Rating distribution"
    >
      <div
        className="MetricsRatingBarSegment MetricsRatingBarSegment--good"
        style={{ width: `${goodPct}%` }}
      />
      <div
        className="MetricsRatingBarSegment MetricsRatingBarSegment--needs-improvement"
        style={{ width: `${needsPct}%` }}
      />
      <div
        className="MetricsRatingBarSegment MetricsRatingBarSegment--poor"
        style={{ width: `${poorPct}%` }}
      />
    </div>
  );
}

function Card({ summary }: { summary: MetricSummary }) {
  const { good, needsImprovement, poor } = summary.ratings;

  return (
    <article className="MetricsCard">
      <h2 className="MetricsCardTitle">{summary.name}</h2>
      <dl className="MetricsCardStats">
        <div>
          <dt>Samples</dt>
          <dd>{summary.count.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Average</dt>
          <dd>{formatMetricValue(summary.name, summary.avg)}</dd>
        </div>
        <div>
          <dt>P75</dt>
          <dd>{formatMetricValue(summary.name, summary.p75)}</dd>
        </div>
      </dl>
      <div className="MetricsCardRatings">
        <RatingBar summary={summary} />
        <ul className="MetricsRatingLegend">
          <li>
            <span className="MetricsRatingLegendLabel">
              <span className="MetricsRatingDot MetricsRatingDot--good" />
              Good
            </span>
            <span className="MetricsRatingLegendValue">{good}</span>
          </li>
          <li>
            <span className="MetricsRatingLegendLabel">
              <span className="MetricsRatingDot MetricsRatingDot--needs-improvement" />
              Needs improvement
            </span>
            <span className="MetricsRatingLegendValue">{needsImprovement}</span>
          </li>
          <li>
            <span className="MetricsRatingLegendLabel">
              <span className="MetricsRatingDot MetricsRatingDot--poor" />
              Poor
            </span>
            <span className="MetricsRatingLegendValue">{poor}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}

export const MetricsSummary = {
  Card,
  Grid,
  Lead,
  RatingBar,
  Root,
  Title,
};
