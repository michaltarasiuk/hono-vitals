import type { ComponentType, ReactNode } from "react";

import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import type { MetricName } from "@/lib/collect/schema";
import type { Flags } from "@/lib/metric/flags/serialize";

import { schemaDefaults, type FlagsSchema } from "@/lib/metric/flags/defaults";

interface CreateMetricRouteOptions<T extends Flags> {
  metric: MetricName;
  schema: FlagsSchema<T>;
  observer: ComponentType<{ flags: T }>;
  children: (flags: T) => ReactNode;
}

export function createMetricRoute<T extends Flags>({
  metric,
  schema,
  observer: Observer,
  children,
}: CreateMetricRouteOptions<T>) {
  const defaults = schemaDefaults(schema);

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
