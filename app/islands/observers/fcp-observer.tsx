import { useEffect } from "react";

import type { FcpFlags } from "@/lib/metric/flags/defaults/fcp";

import { type ReportedMetric, reportMetric } from "@/lib/collect/report-metric";
import { isDefined } from "@/lib/is-defined";
import {
  type BatchReporter,
  createBatchReporter,
} from "@/lib/metric/batch-reporter";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import {
  buildObserverOptions,
  OBSERVER_RECIPES,
} from "@/lib/metric/observer-options";

export function FcpObserver({ flags }: { flags: FcpFlags }) {
  useEffect(() => {
    let ignore = false;
    let dispose: (() => void) | null = null;

    void (async () => {
      const { onFCP } = await loadWebVitals({
        attribution: flags.attribution,
        deferLibraryLoad: flags.deferLibraryLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      let batch: BatchReporter | null = null;
      if (flags.batchReporting) {
        batch = createBatchReporter();
        dispose = batch.dispose;
      }

      onFCP(
        (metric) => {
          const reported: ReportedMetric = { metric, instance: 1 };

          if (isDefined(batch)) {
            batch.enqueue(reported);
          } else {
            reportMetric(reported);
          }
        },
        buildObserverOptions(OBSERVER_RECIPES.fcp, flags, 1),
      );

      if (flags.secondObserver) {
        onFCP(
          (metric) => {
            reportMetric({ metric, instance: 2 });
          },
          buildObserverOptions(OBSERVER_RECIPES.fcp, flags, 2),
        );
      }

      if (ignore) {
        dispose?.();
      }
    })();

    return () => {
      ignore = true;
      dispose?.();
    };
  }, [flags]);

  return null;
}
