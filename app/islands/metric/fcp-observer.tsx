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
        deferLibraryLoad: flags.deferLibraryLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      onFCP(
        (fcp) => {
          fcp.instance = 1;
          reportMetric(fcp);
        },
        buildFcpOptions(flags, 1),
      );

      if (flags.secondObserver) {
        onFCP(
          (fcp) => {
            fcp.instance = 2;
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
