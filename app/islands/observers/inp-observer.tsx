import { useEffect } from "react";

import type { InpFlags } from "@/lib/metric/flags/defaults/inp";

import { type ReportedMetric, reportMetric } from "@/lib/collect/report-metric";
import { isDefined } from "@/lib/is-defined";
import {
  type BatchReporter,
  createBatchReporter,
} from "@/lib/metric/batch-reporter";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildObserverOptions } from "@/lib/metric/observer-options";

export function InpObserver({ flags }: { flags: InpFlags }) {
  useEffect(() => {
    let ignore = false;
    let dispose: (() => void) | null = null;

    void (async () => {
      const { onINP } = await loadWebVitals({
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

      onINP(
        (metric) => {
          const reported: ReportedMetric = { metric, instance: 1 };

          if (isDefined(batch)) {
            batch.enqueue(reported);
          } else {
            reportMetric(reported);
          }
        },
        buildObserverOptions("INP", flags, 1),
      );

      if (flags.secondObserver) {
        onINP(
          (metric) => {
            reportMetric({ metric, instance: 2 });
          },
          buildObserverOptions("INP", flags, 2),
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
