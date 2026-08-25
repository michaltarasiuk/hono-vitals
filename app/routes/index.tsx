import {createRoute} from 'honox/factory';

import {DeleteMetrics} from '@/app/components/home/$delete-metrics';
import {MetricStatsCard} from '@/app/components/home/metric-stats-card';
import {Metrics} from '@/app/components/home/metrics';
import {Header} from '@/app/components/layout/header';
import {Heading} from '@/app/components/ui/heading';
import {getMetricStats} from '@/lib/db/metrics';

export default createRoute(async (c) => {
  const stats = await getMetricStats();

  return c.render(
    <>
      <Header.Root>
        <Header.Nav currentPath={c.req.path} />
        <Header.Actions>
          <DeleteMetrics />
        </Header.Actions>
      </Header.Root>
      <main className="MetricMain">
        <Metrics.Section>
          <Heading>Metrics</Heading>
          <Metrics.Total stats={stats} />
          <Metrics.Grid>
            {stats.map((s) => (
              <MetricStatsCard key={s.name} stats={s} />
            ))}
          </Metrics.Grid>
        </Metrics.Section>
      </main>
    </>,
  );
});
