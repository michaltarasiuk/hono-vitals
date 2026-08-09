import type {MetricName} from '@/lib/collect/metric-schema'
import type {Flags} from '@/lib/metric/flags/schema'

declare module '@hono/react-renderer' {
  interface Props {
    metric: MetricName
    flags: Flags
    defaults: Flags
  }
}

declare module 'react' {
  interface HTMLAttributes {
    elementtiming?: string
  }
}
