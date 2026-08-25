import {parseResponse} from 'hono/client';
import {useTransition} from 'react';

import {Header} from '@/app/components/layout/header';
import {AlertDialog} from '@/app/components/ui/alert-dialog';
import {Button} from '@/app/components/ui/button';
import {collectClient} from '@/lib/collect/client';
import {islandId} from '@/lib/utils/island-id';

const DELETE_METRICS_TRIGGER_ID = islandId('delete-metrics-trigger');

export function DeleteMetrics() {
  const [isPending, startTransition] = useTransition();

  function handleClear() {
    if (isPending) {
      return;
    }

    startTransition(async () => {
      try {
        await parseResponse(collectClient.index.$delete());
        location.reload();
      } catch (e) {
        console.error('Failed to clear metrics', e);
      }
    });
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger
        id={DELETE_METRICS_TRIGGER_ID}
        disabled={isPending}
        render={<Button />}
      >
        <Header.Label
          full={isPending ? 'Deleting samples' : 'Delete samples'}
          short={isPending ? 'Deleting' : 'Delete'}
        />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Header>
            <AlertDialog.Title>Delete samples?</AlertDialog.Title>
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
              {isPending ? 'Deleting' : 'Delete'}
            </AlertDialog.Close>
          </AlertDialog.Actions>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
