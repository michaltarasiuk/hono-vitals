import {parseResponse} from 'hono/client';
import {useTransition} from 'react';

import {AlertDialog} from '@/app/components/ui/alert-dialog';
import {Button} from '@/app/components/ui/button';
import {collectClient} from '@/lib/collect/client';
import {islandId} from '@/lib/island-id';

const CLEAR_METRICS_TRIGGER_ID = islandId('clear-metrics-trigger');

export function ClearMetrics() {
  const [isPending, startTransition] = useTransition();

  function handleClear() {
    if (isPending) {
      return;
    }

    startTransition(async () => {
      try {
        await parseResponse(collectClient.index.$delete());
        location.reload();
      } catch (error) {
        console.error('Failed to clear metrics', error);
      }
    });
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger
        id={CLEAR_METRICS_TRIGGER_ID}
        disabled={isPending}
        render={<Button />}
      >
        <span className="ClearMetricsLabel ClearMetricsLabel--full">
          {isPending ? 'Clearing samples' : 'Clear samples'}
        </span>
        <span className="ClearMetricsLabel ClearMetricsLabel--short">
          {isPending ? 'Clearing' : 'Clear'}
        </span>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Header>
            <AlertDialog.Title>Clear samples?</AlertDialog.Title>
            <AlertDialog.Description>
              Deletes all stored samples from the database. This can’t be
              undone.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Actions>
            <AlertDialog.Close render={<Button />} disabled={isPending}>
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close
              render={<Button />}
              disabled={isPending}
              onClick={handleClear}
            >
              {isPending ? 'Clearing' : 'Clear'}
            </AlertDialog.Close>
          </AlertDialog.Actions>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
