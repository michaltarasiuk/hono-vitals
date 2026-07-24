import { useState } from "react";

import type { Flags } from "@/lib/metric/flags/schema";

import { Button } from "@/app/components/ui/button/button";
import { Dialog } from "@/app/components/ui/dialog/dialog";
import { Field } from "@/app/components/ui/field/field";
import { NumberField } from "@/app/components/ui/number-field/number-field";
import { Switch } from "@/app/components/ui/switch/switch";
import { assertNever } from "@/lib/assert-never";
import { navigateWithFlags } from "@/lib/metric/flags/apply-flags";
import { sortFlagEntries } from "@/lib/metric/flags/sort-flag-entries";
import { formatFlagLabel } from "@/lib/metric/format-flag-label";

// Stable id so island hydration matches full-page SSR (Honox useId path differs).
const FLAGS_EDITOR_TRIGGER_ID = "metric-flags-trigger";

interface FlagsEditorProps {
  flags: Flags;
  defaults: Flags;
}

export function FlagsEditor({ flags, defaults }: FlagsEditorProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(flags);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setDraft(flags);
    }
  }

  function handleSave() {
    navigateWithFlags(draft, defaults);
  }

  return (
    <Dialog.Root
      open={open}
      triggerId={FLAGS_EDITOR_TRIGGER_ID}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Trigger id={FLAGS_EDITOR_TRIGGER_ID} render={<Button />}>
        <span className="FlagsEditorLabel FlagsEditorLabel--full">
          Edit flags
        </span>
        <span className="FlagsEditorLabel FlagsEditorLabel--short">Flags</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Flags</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {sortFlagEntries(draft).map(([key, value]) => {
              switch (typeof value) {
                case "boolean":
                  return (
                    <Field.Root key={key} name={key}>
                      <Field.Label>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => {
                            setDraft((d) => ({
                              ...d,
                              [key]: checked,
                            }));
                          }}
                        />
                        {formatFlagLabel(key)}
                      </Field.Label>
                    </Field.Root>
                  );
                case "number":
                  return (
                    <Field.Root key={key} name={key}>
                      <Field.Label>{formatFlagLabel(key)}</Field.Label>
                      <NumberField.Root
                        name={key}
                        value={value}
                        min={0}
                        step={1}
                        onValueChange={(next) => {
                          setDraft((d) => ({
                            ...d,
                            [key]: next ?? 0,
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
                  );
                default:
                  return assertNever(value);
              }
            })}
          </Dialog.Body>
          <Dialog.Actions>
            <Dialog.Close render={<Button />}>Cancel</Dialog.Close>
            <Button onClick={handleSave}>Save</Button>
          </Dialog.Actions>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
