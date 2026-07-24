import { useEffect } from "react";

import type { LcpFlags } from "@/lib/metric/flags/lcp";

import { reportMetric } from "@/lib/collect/report";
import { isDefined } from "@/lib/is-defined";
import { createBatchReporter } from "@/lib/metric/batch-reporter";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildLcpOptions } from "@/lib/metric/observer-options";
import { removeLcpElement } from "@/lib/metric/remove-lcp-element";

export function LcpObserver({ flags }: { flags: LcpFlags }) {
  useEffect(() => {
    let ignore = false;

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

      const batch = flags.batchReporting ? createBatchReporter() : null;

      function registerLCP() {
        onLCP(
          (lcp) => {
            lcp.instance = 1;

            if (isDefined(batch)) {
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

      if (flags.secondObserver) {
        onLCP(
          (lcp) => {
            lcp.instance = 2;
            reportMetric(lcp);
          },
          buildLcpOptions(flags, 2),
        );
      }
    })();

    return () => {
      ignore = true;
    };
  }, [flags]);

  return null;
}
