import {useEffect, useState} from 'react';

import {Button} from '@/app/components/ui/button';
import {NumberField} from '@/app/components/ui/number-field';
import {islandId} from '@/lib/island-id';
import {
  INP_BLOCKING_EVENT_NAMES,
  resetBlockingTimes,
  setBlockingTime,
  type InpBlockingEventName,
} from '@/lib/metric/inp-blocking';

import type {InpFlags} from '@/lib/metric/flags/defaults';

function initialBlockingTimes(flags: InpFlags) {
  return Object.fromEntries(
    INP_BLOCKING_EVENT_NAMES.map((en) => [en, flags[`${en}BlockingTime`]]),
  ) as Record<InpBlockingEventName, number>;
}

function blockingTimeFieldId(en: InpBlockingEventName) {
  return islandId(`inp-${en}-blocking-time`);
}

export function InpBlockingControls({flags}: {flags: InpFlags}) {
  const [blockingTimes, setBlockingTimes] = useState(() =>
    initialBlockingTimes(flags),
  );

  useEffect(() => {
    for (const en of INP_BLOCKING_EVENT_NAMES) {
      setBlockingTime(en, blockingTimes[en]);
    }

    return () => {
      resetBlockingTimes();
    };
  }, [blockingTimes]);

  function handleReset() {
    setBlockingTimes(
      Object.fromEntries(
        INP_BLOCKING_EVENT_NAMES.map((en) => [en, 0]),
      ) as Record<InpBlockingEventName, number>,
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {INP_BLOCKING_EVENT_NAMES.map((en) => {
        const inputId = blockingTimeFieldId(en);

        // Avoid Field.Root/Label: Base UI's LabelableProvider uses useId() for
        // control ids, which mismatch across Honox SSR vs island hydration.
        // Use islandId() + plain label instead (same Field/Label styles).
        return (
          <div key={en} className="Field">
            <label htmlFor={inputId} className="Label">
              {en} blocking time
            </label>
            <NumberField.Root
              id={inputId}
              name={`${en}-blocking-time`}
              value={blockingTimes[en]}
              min={0}
              step={1}
              onValueChange={(v) => {
                setBlockingTimes((bt) => ({
                  ...bt,
                  [en]: v ?? 0,
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
