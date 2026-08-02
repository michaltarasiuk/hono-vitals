import { useEffect, useState } from "react";

import type { InpFlags } from "@/lib/metric/flags/defaults/inp";

import { Button } from "@/app/components/ui/button/button";
import { NumberField } from "@/app/components/ui/number-field/number-field";
import {
  type ReportedMetric,
  reportMetric,
} from "@/lib/collect/report-metric";
import { isDefined } from "@/lib/is-defined";
import { createBatchReporter } from "@/lib/metric/batch-reporter";
import {
  INP_BLOCKING_EVENT_NAMES,
  resetBlockingTimes,
  setBlockingTime,
  type InpBlockingEventName,
} from "@/lib/metric/inp-blocking";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import {
  buildObserverOptions,
  OBSERVER_RECIPES,
} from "@/lib/metric/observer-options";

function initialBlockingTimes(flags: InpFlags) {
  const blockingTimes = {} as Record<InpBlockingEventName, number>;
  for (const eventName of INP_BLOCKING_EVENT_NAMES) {
    blockingTimes[eventName] = flags[`${eventName}BlockingTime`];
  }
  return blockingTimes;
}

export function InpBlockingControls({ flags }: { flags: InpFlags }) {
  const [blockingTimes, setBlockingTimes] = useState(() =>
    initialBlockingTimes(flags),
  );

  useEffect(() => {
    for (const eventName of INP_BLOCKING_EVENT_NAMES) {
      setBlockingTime(eventName, blockingTimes[eventName]);
    }

    return () => {
      resetBlockingTimes();
    };
  }, [blockingTimes]);

  useEffect(() => {
    let ignore = false;

    void (async () => {
      const { onINP } = await loadWebVitals({
        attribution: flags.attribution,
        deferLibraryLoad: flags.deferLibraryLoad,
        loadAfterInput: flags.loadAfterInput,
      });

      if (ignore) {
        return;
      }

      const batch = flags.batchReporting ? createBatchReporter() : null;

      onINP(
        (metric) => {
          const reported: ReportedMetric = { metric, instance: 1 };

          if (isDefined(batch)) {
            batch.enqueue(reported);
          } else {
            reportMetric(reported);
          }
        },
        buildObserverOptions(OBSERVER_RECIPES.inp, flags, 1),
      );

      if (flags.secondObserver) {
        onINP(
          (metric) => {
            reportMetric({ metric, instance: 2 });
          },
          buildObserverOptions(OBSERVER_RECIPES.inp, flags, 2),
        );
      }
    })();

    return () => {
      ignore = true;
    };
  }, [flags]);

  function handleReset() {
    setBlockingTimes(
      Object.fromEntries(
        INP_BLOCKING_EVENT_NAMES.map((eventName) => [eventName, 0]),
      ) as Record<InpBlockingEventName, number>,
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {INP_BLOCKING_EVENT_NAMES.map((eventName) => {
        // Stable id so island hydration matches full-page SSR (Honox useId path differs).
        const id = `${eventName}-blocking-time`;

        return (
          <div key={eventName} className="Field">
            <label htmlFor={id} className="Label">
              {eventName} blocking time
            </label>
            <NumberField.Root
              id={id}
              name={id}
              value={blockingTimes[eventName]}
              min={0}
              step={1}
              onValueChange={(next) => {
                setBlockingTimes((bt) => ({
                  ...bt,
                  [eventName]: next ?? 0,
                }));
              }}
            >
              <NumberField.Group>
                <NumberField.Decrement />
                <NumberField.Input />
                <NumberField.Increment />
              </NumberField.Group>
            </NumberField.Root>
          </div>
        );
      })}
      <Button type="button" onClick={handleReset}>
        Reset blocking time to zero
      </Button>
    </form>
  );
}
