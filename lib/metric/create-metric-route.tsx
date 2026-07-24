import type { ComponentType, ReactNode } from "react";

import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import type { MetricName } from "@/lib/collect/schema";
import type { Flags } from "@/lib/metric/flags/serialize";

import { flagsSchema, type WidenFlags } from "@/lib/metric/flags/coerce";

interface CreateMetricRouteOptions<T extends Flags> {
  metric: MetricName;
  defaults: T;
  observer: ComponentType<{ flags: WidenFlags<T> }>;
  children: (flags: WidenFlags<T>) => ReactNode;
}

export function createMetricRoute<T extends Flags>({
  metric,
  defaults,
  observer: Observer,
  children,
}: CreateMetricRouteOptions<T>) {
  const schema = flagsSchema(defaults);

  return createRoute(zValidator("query", schema), (c) => {
    const flags = c.req.valid("query");

    return c.render(
      <>
        {children(flags)}
        <Observer flags={flags} />
      </>,
      {
        metric,
        flags,
        defaults,
      },
    );
  });
}
