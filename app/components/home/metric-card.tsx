import {createContext, use} from 'react'

import {isDefined} from '@/lib/is-defined'
import {formatMetricRating} from '@/lib/metric/format-rating'
import {formatMetricValue} from '@/lib/metric/format-value'
import {metricHref} from '@/lib/metric/href'

import type {MetricSummary} from '@/lib/analytics/metrics'

const MetricCardContext = createContext<MetricSummary | null>(null)

function useMetricCard() {
  const summary = use(MetricCardContext)
  if (!isDefined(summary)) {
    throw new Error('useMetricCard must be used within MetricCard.Provider')
  }
  return summary
}

interface ProviderProps {
  summary: MetricSummary
  children: React.ReactNode
}

function Provider({summary, children}: ProviderProps) {
  return <MetricCardContext value={summary}>{children}</MetricCardContext>
}

function Root({children}: {children: React.ReactNode}) {
  const {name} = useMetricCard()

  return (
    <a className="MetricsCard" href={metricHref(name)}>
      {children}
    </a>
  )
}

function Title() {
  const {name} = useMetricCard()

  return <h2 className="MetricsCardTitle">{name}</h2>
}

function Stats({children}: {children: React.ReactNode}) {
  return <dl className="MetricsCardStats">{children}</dl>
}

function Stat({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function Samples() {
  const {count} = useMetricCard()

  return <Stat label="Samples">{count.toLocaleString()}</Stat>
}

function Average() {
  const {name, avg} = useMetricCard()

  return <Stat label="Average">{formatMetricValue(name, avg)}</Stat>
}

function P75() {
  const {name, p75} = useMetricCard()

  return <Stat label="P75">{formatMetricValue(name, p75)}</Stat>
}

function Ratings({children}: {children: React.ReactNode}) {
  return <div className="MetricsCardRatings">{children}</div>
}

function ratingCounts(summary: MetricSummary) {
  return [
    {rating: 'good', count: summary.good},
    {rating: 'needs-improvement', count: summary.needsImprovement},
    {rating: 'poor', count: summary.poor},
  ] as const
}

function RatingBar() {
  const summary = useMetricCard()

  if (summary.count === 0) {
    return <div className="MetricsRatingBar MetricsRatingBar--empty" />
  }

  return (
    <div className="MetricsRatingBar">
      {ratingCounts(summary).map(({rating, count}) => (
        <div
          key={rating}
          className={`MetricsRatingBarSegment MetricsRatingBarSegment--${rating}`}
          style={{width: `${(count / summary.count) * 100}%`}}
        />
      ))}
    </div>
  )
}

function RatingLegend() {
  const summary = useMetricCard()

  return (
    <ul className="MetricsRatingLegend">
      {ratingCounts(summary).map(({rating, count}) => (
        <li key={rating}>
          <span className="MetricsRatingLegendLabel">
            <span className={`MetricsRatingDot MetricsRatingDot--${rating}`} />
            {formatMetricRating(rating)}
          </span>
          <span className="MetricsRatingLegendValue">{count}</span>
        </li>
      ))}
    </ul>
  )
}

export const MetricCard = {
  Provider,
  Root,
  Title,
  Stats,
  Stat,
  Samples,
  Average,
  P75,
  Ratings,
  RatingBar,
  RatingLegend,
}

export function MetricSummaryCard({summary}: {summary: MetricSummary}) {
  return (
    <MetricCard.Provider summary={summary}>
      <MetricCard.Root>
        <MetricCard.Title />
        <MetricCard.Stats>
          <MetricCard.Samples />
          <MetricCard.Average />
          <MetricCard.P75 />
        </MetricCard.Stats>
        <MetricCard.Ratings>
          <MetricCard.RatingBar />
          <MetricCard.RatingLegend />
        </MetricCard.Ratings>
      </MetricCard.Root>
    </MetricCard.Provider>
  )
}
