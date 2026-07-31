import { useEffect } from "react";

import type { TtfbFlags } from "@/lib/metric/flags/defaults/ttfb";

import { reportMetric } from "@/lib/collect/report-metric";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import {
  buildObserverOptions,
  OBSERVER_RECIPES,
} from "@/lib/metric/observer-options";
import { overrideResponseStart } from "@/lib/metric/override-response-start";

export function TtfbObserver({ flags }: { flags: TtfbFlags }) {
  useEffect(() => {
    if (flags.responseStart) {
      overrideResponseStart(flags.responseStart);
    }
  }, [flags.responseStart]);

  useEffect(() => {
    let ignore = false;

    void (async () => {
      const { onTTFB } = await loadWebVitals({
        attribution: flags.attribution,
        deferLibraryLoad: flags.deferLibraryLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      onTTFB(
        (ttfb) => {
          ttfb.instance = 1;
          reportMetric(ttfb);
        },
        buildObserverOptions(OBSERVER_RECIPES.ttfb, flags, 1),
      );

      if (flags.secondObserver) {
        onTTFB(
          (ttfb) => {
            ttfb.instance = 2;
            reportMetric(ttfb);
          },
          buildObserverOptions(OBSERVER_RECIPES.ttfb, flags, 2),
        );
      }
    })();

    return () => {
      ignore = true;
    };
  }, [flags]);

  return null;
}
