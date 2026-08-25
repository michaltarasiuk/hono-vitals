import {zValidator} from '@hono/zod-validator';
import {createRoute} from 'honox/factory';
import {Script} from 'honox/server';

import {Heading} from '@/app/components/ui/heading';
import {flagsSchema} from '@/lib/metric/flags/schema';
import {metricSlug} from '@/lib/metric/href';
import {joinPath} from '@/lib/utils/join-path';

import type {Flags, ParsedFlags} from '@/lib/metric/flags/schema';
import type {MetricName} from '@/lib/metric/schema';
import type {ReactNode} from 'react';

interface MetricRouteConfig<T extends Flags> {
  metricName: MetricName;
  defaults: T;
  Component: (props: {flags: ParsedFlags<T>}) => ReactNode;
}

export function createMetricRoute<T extends Flags>({
  metricName,
  defaults,
  Component,
}: MetricRouteConfig<T>) {
  return createRoute(zValidator('query', flagsSchema(defaults)), (c) => {
    const flags = c.req.valid('query');
    const src = joinPath(
      'app',
      'entries',
      'metric',
      metricSlug(metricName) + '-observer.ts',
    );

    return c.render(
      <>
        <Heading elementtiming="main-heading">{metricName}</Heading>
        <Component flags={flags} />
        <Script src={src} />
      </>,
      {metricName, flags, defaults},
    );
  });
}
