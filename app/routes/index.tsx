import {createRoute} from 'honox/factory'

import {Header} from '@/app/components/header'
import {MetricSummaryCard} from '@/app/components/metric-card'
import {Metrics} from '@/app/components/metrics'
import {Heading} from '@/app/components/ui/heading'
import {ClearMetrics} from '@/app/islands/clear-metrics'
import {getMetricsSummary} from '@/lib/analytics/metrics'

export default createRoute(async (c) => {
  const summaries = await getMetricsSummary()

  return c.render(
    <>
      <Header.Root>
        <Header.Nav currentPath={c.req.path} />
        <Header.Actions>
          <ClearMetrics />
        </Header.Actions>
      </Header.Root>
      <main className="MetricMain">
        <Metrics.Section>
          <Heading>Metrics</Heading>
          <Metrics.Total summaries={summaries} />
          <Metrics.Grid>
            {summaries.map((summary) => (
              <MetricSummaryCard key={summary.name} summary={summary} />
            ))}
          </Metrics.Grid>
        </Metrics.Section>
      </main>
    </>,
  )
})
