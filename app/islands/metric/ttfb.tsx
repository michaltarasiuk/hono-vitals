import { useEffect } from "react";

import type { TtfbFlags } from "@/lib/metric/flags/ttfb";

import { reportMetric } from "@/lib/collect/report";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildTtfbOptions } from "@/lib/metric/observer-options";
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
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      onTTFB(
        (ttfb) => {
          (ttfb as { instance?: number }).instance = 1;
          reportMetric(ttfb);
        },
        buildTtfbOptions(flags, 1),
      );

      if (flags.doubleCall) {
        onTTFB(
          (ttfb) => {
            (ttfb as { instance?: number }).instance = 2;
            reportMetric(ttfb);
          },
          buildTtfbOptions(flags, 2),
        );
      }
    })();

    return () => {
      ignore = true;
    };
  }, [flags]);

  return null;
}
