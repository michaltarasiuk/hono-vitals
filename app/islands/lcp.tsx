import { useEffect } from "react";

import type { LcpFlags } from "@/utils/metric/flags/lcp";

import { createBatchReporter } from "@/utils/metric/batch-reporting";
import { loadWebVitals } from "@/utils/metric/load-web-vitals";
import { buildLcpOptions } from "@/utils/metric/observer-options";
import { removeLcpElement } from "@/utils/metric/remove-lcp-element";
import { reportMetric } from "@/utils/metric/report";

interface LcpObserverProps {
  flags: LcpFlags;
}

export default function LcpObserver({ flags }: LcpObserverProps) {
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
            console.log("LCP:", lcp);

            if (batch) {
              console.log("Adding to queue");
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
          console.log(
            "Got a visibilitychange event",
            document.visibilityState,
          );
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
            console.log("LCP2:", lcp);
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
