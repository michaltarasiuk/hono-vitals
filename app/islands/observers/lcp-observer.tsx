import { useEffect } from "react";

import type { LcpFlags } from "@/lib/metric/flags/defaults/lcp";

import { type ReportedMetric, reportMetric } from "@/lib/collect/report";
import { isDefined } from "@/lib/is-defined";
import {
  type BatchReporter,
  createBatchReporter,
} from "@/lib/metric/batch-reporter";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { observerOptions } from "@/lib/metric/observer-options";
import { removeLcpElement } from "@/lib/metric/remove-lcp-element";

export function LcpObserver({ flags }: { flags: LcpFlags }) {
  useEffect(() => {
    let ignore = false;
    let dispose: (() => void) | null = null;

    void (async () => {
      if (flags.removeElement) {
        await removeLcpElement();
      }

      if (ignore) {
        return;
      }

      const { onLCP } = await loadWebVitals({
        attribution: flags.attribution,
        deferLibraryLoad: flags.deferLibraryLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      let batch: BatchReporter | null = null;
      const disposers: Array<() => void> = [];

      if (flags.batchReporting) {
        batch = createBatchReporter();
        disposers.push(batch.dispose);
      }

      function registerLCP() {
        onLCP(
          (metric) => {
            const reported: ReportedMetric = {
              metric,
              instance: 1,
            };

            if (isDefined(batch)) {
              batch.enqueue(reported);
            } else {
              reportMetric(reported);
            }
          },
          observerOptions("lcp", flags, 1),
        );
      }

      if (flags.registerOnVisibilityChange) {
        function onVisibilityChange() {
          if (document.visibilityState === "visible") {
            registerLCP();
          }
        }

        document.addEventListener("visibilitychange", onVisibilityChange);
        disposers.push(() => {
          document.removeEventListener("visibilitychange", onVisibilityChange);
        });
      } else {
        registerLCP();
      }

      if (flags.secondObserver) {
        onLCP(
          (metric) => {
            reportMetric({ metric, instance: 2 });
          },
          observerOptions("lcp", flags, 2),
        );
      }

      dispose = () => {
        for (const disposeOne of disposers) {
          disposeOne();
        }
      };

      if (ignore) {
        dispose();
      }
    })();

    return () => {
      ignore = true;
      dispose?.();
    };
  }, [flags]);

  return null;
}
