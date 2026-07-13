import { useEffect } from "react";

import type { InpFlags } from "@/lib/metric/flags/inp";

import { reportMetric } from "@/lib/collect/report";
import { createBatchReporter } from "@/lib/metric/batch-reporting";
import {
  addBlockingListeners,
  EVENT_NAMES,
  resetBlockingTimes,
} from "@/lib/metric/inp-blocking";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildInpOptions } from "@/lib/metric/observer-options";

export function InpObserver({ flags }: { flags: InpFlags }) {
  useEffect(() => {
    addBlockingListeners();
    const reset = document.getElementById("reset");
    reset?.addEventListener("click", resetBlockingTimes);
    return () => {
      reset?.removeEventListener("click", resetBlockingTimes);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { onINP } = await loadWebVitals({
        attribution: flags.attribution,
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (cancelled) {
        return;
      }

      const batch = flags.batchReporting ? createBatchReporter() : null;

      onINP(
        (inp) => {
          (inp as { instance?: number }).instance = 1;

          if (batch) {
            batch.enqueue(inp);
          } else {
            reportMetric(inp);
          }
        },
        buildInpOptions(flags, 1),
      );

      if (flags.doubleCall) {
        onINP(
          (inp) => {
            (inp as { instance?: number }).instance = 2;
            reportMetric(inp);
          },
          buildInpOptions(flags, 2),
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [flags]);

  return (
    <form>
      {EVENT_NAMES.map((eventName) => {
        const key = `${eventName}BlockingTime` as keyof InpFlags;
        const value = flags[key];
        return (
          <label key={eventName}>
            {eventName} blocking time
            <input
              id={`${eventName}-blocking-time`}
              type="number"
              defaultValue={typeof value === "number" ? value : 0}
            />
          </label>
        );
      })}
      <button id="reset" type="button">
        Reset blocking time to zero
      </button>
    </form>
  );
}
