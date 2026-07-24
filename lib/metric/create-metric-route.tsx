import type { ComponentType, ReactNode } from "react";

import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import type { MetricName } from "@/lib/collect/schema";
import type { Flags } from "@/lib/metric/flags/schema";

import { flagsSchema, type ParsedFlags } from "@/lib/metric/flags/schema";

interface CreateMetricRouteOptions<T extends Flags> {
  metric: MetricName;
  defaults: T;
  observer: ComponentType<{ flags: ParsedFlags<T> }>;
  render: (flags: ParsedFlags<T>) => ReactNode;
}

export function createMetricRoute<T extends Flags>({
  metric,
  defaults,
  observer: Observer,
  render,
}: CreateMetricRouteOptions<T>) {
  const schema = flagsSchema(defaults);

  return createRoute(zValidator("query", schema), (c) => {
    const flags = c.req.valid("query");

    return c.render(
      <>
        {render(flags)}
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
