import type {MetricSummary} from '@/lib/analytics/metric-summary'

import {Text} from '@/app/components/ui/text'

function Section({children}: {children: React.ReactNode}) {
  return <div className="MetricsSummary">{children}</div>
}

function Total({summaries}: {summaries: MetricSummary[]}) {
  const total = summaries.reduce((acc, summary) => acc + summary.count, 0)

  return <Text>{total.toLocaleString()} lab reports across all metrics.</Text>
}

function Grid({children}: {children: React.ReactNode}) {
  return <div className="MetricsCardGrid">{children}</div>
}

export const Metrics = {
  Section,
  Total,
  Grid,
}
