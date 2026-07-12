import { useEffect } from "react";

import type { TtfbFlags } from "@/utils/metric/flags/ttfb";

import { loadWebVitals } from "@/utils/metric/load-web-vitals";
import { buildTtfbOptions } from "@/utils/metric/observer-options";
import { overrideResponseStart } from "@/utils/metric/override-response-start";
import { reportMetric } from "@/utils/metric/report";

interface TtfbObserverProps {
  flags: TtfbFlags;
}

export default function TtfbObserver({ flags }: TtfbObserverProps) {
  useEffect(() => {
    if (flags.responseStart !== undefined) {
      overrideResponseStart(flags.responseStart);
    }
  }, [flags.responseStart]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { onTTFB } = await loadWebVitals({
        attribution: flags.attribution,
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (cancelled) {
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
      cancelled = true;
    };
  }, [flags]);

  return null;
}
