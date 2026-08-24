import {Text} from '@/app/components/ui/text';

import type {MetricStats} from '@/lib/db/metrics';

function Section({children}: {children: React.ReactNode}) {
  return <div className="MetricsSummary">{children}</div>;
}

function Total({stats}: {stats: MetricStats[]}) {
  const total = stats.reduce((acc, metric) => acc + metric.count, 0);

  return <Text>{total.toLocaleString()} samples collected.</Text>;
}

function Grid({children}: {children: React.ReactNode}) {
  return <div className="MetricsCardGrid">{children}</div>;
}

export const Metrics = {
  Section,
  Total,
  Grid,
};
