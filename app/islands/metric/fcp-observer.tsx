import { useEffect } from "react";

import type { FcpFlags } from "@/lib/metric/flags/defaults/fcp";

import { reportMetric } from "@/lib/collect/report-metric";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import {
  buildObserverOptions,
  OBSERVER_RECIPES,
} from "@/lib/metric/observer-options";

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
        (metric) => {
          reportMetric({ metric, instance: 1 });
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
    })();

    return () => {
      ignore = true;
    };
  }, [flags]);

  return null;
}
