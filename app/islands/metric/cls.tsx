import { useEffect } from "react";

import type { ClsFlags } from "@/utils/metric/flags/cls";

import { useMetricFlags } from "@/app/components/metric/context";
import { createBatchReporter } from "@/utils/metric/batch-reporting";
import { loadWebVitals } from "@/utils/metric/load-web-vitals";
import { buildClsOptions } from "@/utils/metric/observer-options";
import { reportMetric } from "@/utils/metric/report";

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
