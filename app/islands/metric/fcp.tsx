import { useEffect } from "react";

import type { FcpFlags } from "@/utils/metric/flags/fcp";

import { useMetricFlags } from "@/app/components/metric/context";
import { loadWebVitals } from "@/utils/metric/load-web-vitals";
import { buildFcpOptions } from "@/utils/metric/observer-options";
import { reportMetric } from "@/utils/metric/report";

export default function FcpObserver() {
  const flags = useMetricFlags<FcpFlags>();

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { onFCP } = await loadWebVitals({
        attribution: flags.attribution,
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (cancelled) {
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
      cancelled = true;
    };
  }, [flags]);

  return null;
}
