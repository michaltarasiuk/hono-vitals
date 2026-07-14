import { useEffect } from "react";

import type { FcpFlags } from "@/lib/metric/flags/fcp";

import { reportMetric } from "@/lib/collect/report";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildFcpOptions } from "@/lib/metric/observer-options";

export function FcpObserver({ flags }: { flags: FcpFlags }) {
  useEffect(() => {
    let ignore = false;

    void (async () => {
      const { onFCP } = await loadWebVitals({
        attribution: flags.attribution,
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      onFCP(
        (fcp) => {
          (fcp as { instance?: number }).instance = 1;
          reportMetric(fcp);
        },
        buildFcpOptions(flags, 1),
      );

      if (flags.doubleCall) {
        onFCP(
          (fcp) => {
            (fcp as { instance?: number }).instance = 2;
            reportMetric(fcp);
          },
          buildFcpOptions(flags, 2),
        );
      }
    })();

    return () => {
      ignore = true;
    };
  }, [flags]);

  return null;
}
