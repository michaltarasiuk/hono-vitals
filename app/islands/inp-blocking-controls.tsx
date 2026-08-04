import { useEffect, useState } from "react";

import type { InpFlags } from "@/lib/metric/flags/defaults/inp";

import { Button } from "@/app/components/ui/button/button";
import { NumberField } from "@/app/components/ui/number-field/number-field";
import { islandId } from "@/lib/island-id";
import {
  INP_BLOCKING_EVENT_NAMES,
  type InpBlockingEventName,
  resetBlockingTimes,
  setBlockingTime,
} from "@/lib/metric/inp-blocking";

function initialBlockingTimes(flags: InpFlags) {
  const blockingTimes = {} as Record<InpBlockingEventName, number>;
  for (const eventName of INP_BLOCKING_EVENT_NAMES) {
    blockingTimes[eventName] = flags[`${eventName}BlockingTime`];
  }
  return blockingTimes;
}

function blockingTimeFieldId(eventName: InpBlockingEventName) {
  return islandId(`inp-${eventName}-blocking-time`);
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
        const inputId = blockingTimeFieldId(eventName);

        // Avoid Field.Root/Label: Base UI's LabelableProvider uses useId() for
        // control ids, which mismatch across Honox SSR vs island hydration.
        // Use islandId() + plain label instead (same Field/Label styles).
        return (
          <div key={eventName} className="Field">
            <label htmlFor={inputId} className="Label">
              {eventName} blocking time
            </label>
            <NumberField.Root
              id={inputId}
              name={`${eventName}-blocking-time`}
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
