import { parseResponse } from "hono/client";
import { useState } from "react";

import { AlertDialog } from "@/app/components/ui/alert-dialog/alert-dialog";
import { Button } from "@/app/components/ui/button/button";
import { collectClient } from "@/lib/collect/client";
import { islandId } from "@/lib/island-id";

const CLEAR_METRICS_TRIGGER_ID = islandId("clear-metrics-trigger");

export function ClearMetrics() {
  const [pending, setPending] = useState(false);

  async function handleClear() {
    if (pending) {
      return;
    }

    setPending(true);

    try {
      await parseResponse(collectClient.index.$delete());
      window.location.reload();
    } catch (error) {
      console.error("Failed to clear metrics", error);
    } finally {
      setPending(false);
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger id={CLEAR_METRICS_TRIGGER_ID} render={<Button />}>
        <span className="ClearMetricsLabel ClearMetricsLabel--full">
          Clear samples
        </span>
        <span className="ClearMetricsLabel ClearMetricsLabel--short">
          Clear
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
            <AlertDialog.Close render={<Button />}>Cancel</AlertDialog.Close>
            <AlertDialog.Close
              render={<Button />}
              onClick={() => {
                void handleClear();
              }}
            >
              Clear
            </AlertDialog.Close>
          </AlertDialog.Actions>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
