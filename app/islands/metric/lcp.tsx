import { useEffect } from "react";

import type { LcpFlags } from "@/lib/metric/flags/lcp";

import { useMetricFlags } from "@/app/components/metric/context";
import { reportMetric } from "@/lib/collect/report";
import { createBatchReporter } from "@/lib/metric/batch-reporting";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildLcpOptions } from "@/lib/metric/observer-options";
import { removeLcpElement } from "@/lib/metric/remove-lcp-element";

export default function LcpObserver() {
  const flags = useMetricFlags<LcpFlags>();

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      if (flags.removeElement) {
        await removeLcpElement();
      }

      if (cancelled) {
        return;
      }

      const { onLCP } = await loadWebVitals({
        attribution: flags.attribution,
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (cancelled) {
        return;
      }

      const batch = flags.batchReporting ? createBatchReporter() : null;

      function registerLCP() {
        onLCP(
          (lcp) => {
            (lcp as { instance?: number }).instance = 1;

            if (batch) {
              batch.enqueue(lcp);
            } else {
              reportMetric(lcp);
            }
          },
          buildLcpOptions(flags, 1),
        );
      }

      if (flags.registerOnVisibilityChange) {
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            registerLCP();
          }
        });
      } else {
        registerLCP();
      }

      if (flags.doubleCall) {
        onLCP(
          (lcp) => {
            (lcp as { instance?: number }).instance = 2;
            reportMetric(lcp);
          },
          buildLcpOptions(flags, 2),
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [flags]);

  return null;
}
