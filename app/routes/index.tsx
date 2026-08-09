import {createRoute} from 'honox/factory'

import {Header} from '@/app/components/header'
import {MetricsGrid} from '@/app/components/metrics-grid'
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
        <MetricsGrid summaries={summaries} />
      </main>
    </>,
  )
})
