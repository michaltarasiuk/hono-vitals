import type {ReactNode} from 'react'

import {zValidator} from '@hono/zod-validator'
import {createRoute} from 'honox/factory'
import {Script} from 'honox/server'

import type {MetricName} from '@/lib/collect/metric-schema'
import type {Flags, ParsedFlags} from '@/lib/metric/flags/schema'

import {flagsSchema} from '@/lib/metric/flags/schema'
import {metricSlug} from '@/lib/metric/slug'

interface MetricRouteConfig<T extends Flags> {
  metricName: MetricName
  defaults: T
  children: (flags: ParsedFlags<T>) => ReactNode
}

export function createMetricRoute<T extends Flags>({
  metricName,
  defaults,
  children,
}: MetricRouteConfig<T>) {
  return createRoute(zValidator('query', flagsSchema(defaults)), (c) => {
    const flags = c.req.valid('query')

    return c.render(
      <>
        {children(flags)}
        <Script
          src={`/app/scripts/metric/${metricSlug(metricName)}-observer.ts`}
        />
      </>,
      {metricName, flags, defaults},
    )
  })
}
