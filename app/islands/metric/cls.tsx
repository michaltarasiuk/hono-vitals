import { useEffect } from "react";

import type { ClsFlags } from "@/lib/metric/flags/cls";

import { useMetricFlags } from "@/app/components/metric/context";
import { reportMetric } from "@/lib/collect/report";
import { createBatchReporter } from "@/lib/metric/batch-reporting";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildClsOptions } from "@/lib/metric/observer-options";

export default function ClsObserver() {
  const flags = useMetricFlags<ClsFlags>();

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { onCLS } = await loadWebVitals({
        attribution: flags.attribution,
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (cancelled) {
        return;
      }

      const batch = flags.batchReporting ? createBatchReporter() : null;

      onCLS(
        (cls) => {
          (cls as { instance?: number }).instance = 1;

          if (batch) {
            batch.enqueue(cls);
          } else {
            reportMetric(cls);
          }
        },
        buildClsOptions(flags, 1),
      );

      if (flags.doubleCall) {
        onCLS(
          (cls) => {
            (cls as { instance?: number }).instance = 2;
            reportMetric(cls);
          },
          buildClsOptions(flags, 2),
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [flags]);

  return null;
}
