import { useEffect } from "react";

import type { TtfbFlags } from "@/lib/metric/flags/defaults/ttfb";

import { type ReportedMetric, reportMetric } from "@/lib/collect/report-metric";
import { isDefined } from "@/lib/is-defined";
import {
  type BatchReporter,
  createBatchReporter,
} from "@/lib/metric/batch-reporter";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { observerOptions } from "@/lib/metric/observer-options";
import { overrideResponseStart } from "@/lib/metric/override-response-start";

export function TtfbObserver({ flags }: { flags: TtfbFlags }) {
  useEffect(() => {
    if (flags.responseStart) {
      overrideResponseStart(flags.responseStart);
    }
  }, [flags.responseStart]);

  useEffect(() => {
    let ignore = false;
    let dispose: (() => void) | null = null;

    void (async () => {
      const { onTTFB } = await loadWebVitals({
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

      onTTFB(
        (metric) => {
          const reported: ReportedMetric = { metric, instance: 1 };

          if (isDefined(batch)) {
            batch.enqueue(reported);
          } else {
            reportMetric(reported);
          }
        },
        observerOptions("ttfb", flags, 1),
      );

      if (flags.secondObserver) {
        onTTFB(
          (metric) => {
            reportMetric({ metric, instance: 2 });
          },
          observerOptions("ttfb", flags, 2),
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
