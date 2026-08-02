import { useEffect } from "react";

import type { ClsFlags } from "@/lib/metric/flags/defaults/cls";

import {
  type ReportedMetric,
  reportMetric,
} from "@/lib/collect/report-metric";
import { isDefined } from "@/lib/is-defined";
import { createBatchReporter } from "@/lib/metric/batch-reporter";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import {
  buildObserverOptions,
  OBSERVER_RECIPES,
} from "@/lib/metric/observer-options";

export function ClsObserver({ flags }: { flags: ClsFlags }) {
  useEffect(() => {
    let ignore = false;

    void (async () => {
      const { onCLS } = await loadWebVitals({
        attribution: flags.attribution,
        deferLibraryLoad: flags.deferLibraryLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      const batch = flags.batchReporting ? createBatchReporter() : null;

      onCLS(
        (metric) => {
          const reported: ReportedMetric = { metric, instance: 1 };

          if (isDefined(batch)) {
            batch.enqueue(reported);
          } else {
            reportMetric(reported);
          }
        },
        buildObserverOptions(OBSERVER_RECIPES.cls, flags, 1),
      );

      if (flags.secondObserver) {
        onCLS(
          (metric) => {
            reportMetric({ metric, instance: 2 });
          },
          buildObserverOptions(OBSERVER_RECIPES.cls, flags, 2),
        );
      }
    })();

    return () => {
      ignore = true;
    };
  }, [flags]);

  return null;
}
