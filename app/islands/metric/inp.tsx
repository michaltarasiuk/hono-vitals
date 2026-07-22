import { useEffect, useState } from "react";

import type { InpFlags } from "@/lib/metric/flags/inp";

import { Button } from "@/app/components/ui/button/button";
import { NumberField } from "@/app/components/ui/number-field/number-field";
import { reportMetric } from "@/lib/collect/report";
import { createBatchReporter } from "@/lib/metric/batch-reporting";
import {
  EVENT_NAMES,
  resetBlockingTimes,
  setBlockingTime,
  type EventName,
} from "@/lib/metric/inp-blocking";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import { buildInpOptions } from "@/lib/metric/observer-options";
import { isDefined } from "@/lib/shared/is-defined";

function initialBlockingTimes(flags: InpFlags): Record<EventName, number> {
  const blockingTimes = {} as Record<EventName, number>;
  for (const eventName of EVENT_NAMES) {
    blockingTimes[eventName] = flags[`${eventName}BlockingTime`];
  }
  return blockingTimes;
}

export function InpObserver({ flags }: { flags: InpFlags }) {
  const [blockingTimes, setBlockingTimes] = useState(() =>
    initialBlockingTimes(flags),
  );

  useEffect(() => {
    for (const eventName of EVENT_NAMES) {
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

          if (isDefined(batch)) {
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

  function handleReset() {
    setBlockingTimes(
      Object.fromEntries(
        EVENT_NAMES.map((eventName) => [eventName, 0]),
      ) as Record<EventName, number>,
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {EVENT_NAMES.map((eventName) => {
        // Stable id so island hydration matches full-page SSR (Honox useId path differs).
        const id = `${eventName}-blocking-time`;

        return (
          <div key={eventName} className="Field">
            <label className="Label" htmlFor={id}>
              {eventName} blocking time
            </label>
            <NumberField.Root
              id={id}
              name={id}
              value={blockingTimes[eventName]}
              min={0}
              step={1}
              onValueChange={(next) => {
                setBlockingTimes((prevBlockingTimes) => ({
                  ...prevBlockingTimes,
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
