import { useEffect } from "react";

import type { ClsFlags } from "@/utils/metric/flags/cls";

import { createBatchReporter } from "@/utils/metric/batch-reporting";
import { loadWebVitals } from "@/utils/metric/load-web-vitals";
import { buildClsOptions } from "@/utils/metric/observer-options";
import { reportMetric } from "@/utils/metric/report";

interface ClsObserverProps {
  flags: ClsFlags;
}

export default function ClsObserver({ flags }: ClsObserverProps) {
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
          console.log("CLS:", cls);

          if (batch) {
            console.log("Adding to queue");
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
            console.log("CLS2:", cls);
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
