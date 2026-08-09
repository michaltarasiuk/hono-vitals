import {zValidator} from '@hono/zod-validator'
import {createRoute} from 'honox/factory'

import type {MetricName} from '@/lib/collect/metric-schema'
import type {Flags, ParsedFlags} from '@/lib/metric/flags/schema'

import {flagsSchema} from '@/lib/metric/flags/schema'

interface DefineMetricOptions<T extends Flags> {
  name: MetricName
  defaults: T
  Observer: React.ComponentType<{flags: ParsedFlags<T>}>
  Content: React.ComponentType<{flags: ParsedFlags<T>}>
}

export function defineMetric<T extends Flags>({
  name,
  defaults,
  Observer,
  Content,
}: DefineMetricOptions<T>) {
  return createRoute(zValidator('query', flagsSchema(defaults)), (c) => {
    const flags = c.req.valid('query')

    return c.render(
      <>
        <Content flags={flags} />
        <Observer flags={flags} />
      </>,
      {
        metricName: name,
        flags,
        defaults,
      },
    )
  })
}
