import { useEffect, useState } from "react";

import type { InpFlags } from "@/lib/metric/flags/defaults/inp";

import { Button } from "@/app/components/ui/button/button";
import { Field } from "@/app/components/ui/field/field";
import { NumberField } from "@/app/components/ui/number-field/number-field";
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
      {INP_BLOCKING_EVENT_NAMES.map((eventName) => (
        <Field.Root key={eventName} name={`${eventName}-blocking-time`}>
          <Field.Label>{eventName} blocking time</Field.Label>
          <NumberField.Root
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
        </Field.Root>
      ))}
      <Button type="button" onClick={handleReset}>
        Reset blocking time to zero
      </Button>
    </form>
  );
}
