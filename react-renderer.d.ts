import type { MetricName } from "@/lib/collect/schema";
import type { Flags } from "@/lib/metric/flags/serialize";

declare module "@hono/react-renderer" {
  interface Props {
    metric: MetricName;
    flags: Flags;
    defaults: Flags;
  }
}
