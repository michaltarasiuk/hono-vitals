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
    const resetElement = document.getElementById("reset");
    if (resetElement) {
      resetElement.addEventListener("click", resetBlockingTimes);
      return () => {
        resetElement.removeEventListener("click", resetBlockingTimes);
      };
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    void (async () => {
      const { onINP } = await loadWebVitals({
        attribution: flags.attribution,
        lazyLoad: flags.lazyLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      const batch = flags.batchReporting ? createBatchReporter() : null;

      onINP(
        (inp) => {
          inp.instance = 1;

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
            inp.instance = 2;
            reportMetric(inp);
          },
          buildInpOptions(flags, 2),
        );
      }
    })();

    return () => {
      ignore = true;
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
