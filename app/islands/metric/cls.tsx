import { useEffect } from "react";

import type { ClsFlags } from "@/lib/metric/flags/cls";

import { reportMetric } from "@/lib/collect/report";
import { isDefined } from "@/lib/is-defined";
import { createBatchReporter } from "@/lib/metric/batch-reporter";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildClsOptions } from "@/lib/metric/observer-options";

export function ClsObserver({ flags }: { flags: ClsFlags }) {
  useEffect(() => {
    let ignore = false;

    void (async () => {
      const { onCLS } = await loadWebVitals({
        attribution: flags.attribution,
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      const batch = flags.batchReporting ? createBatchReporter() : null;

      onCLS(
        (cls) => {
          cls.instance = 1;

          if (isDefined(batch)) {
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
            cls.instance = 2;
            reportMetric(cls);
          },
          buildClsOptions(flags, 2),
        );
      }
    })();

    return () => {
      ignore = true;
    };
  }, [flags]);

  return null;
}
