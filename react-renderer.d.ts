import type {Flags} from '@/lib/metric/flags/schema';
import type {MetricName} from '@/lib/metric/schema';

declare module '@hono/react-renderer' {
  interface Props {
    metricName: MetricName;
    flags: Flags;
    defaults: Flags;
  }
}

declare module 'react' {
  interface HTMLAttributes {
    elementtiming?: string;
  }
}
