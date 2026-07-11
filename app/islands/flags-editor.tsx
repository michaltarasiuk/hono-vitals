import { useState } from "react";

import { Button } from "@/app/components/ui/button/button";
import { Dialog } from "@/app/components/ui/dialog/dialog";
import { Field } from "@/app/components/ui/field/field";
import { NumberField } from "@/app/components/ui/number-field/number-field";
import { Switch } from "@/app/components/ui/switch/switch";
import { assertNever } from "@/utils/assert-never";
import { formatFlagLabel } from "@/utils/format-flag-label";
import { applyFlags, type FlagValue } from "@/utils/metric/flags/serialize";
import { sortFlagEntries } from "@/utils/metric/flags/sort-flag-entries";

interface FlagsEditorProps {
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
}

/** Stable id so island hydration matches full-page SSR (Honox useId path differs). */
const FLAGS_EDITOR_TRIGGER_ID = "metric-flags-trigger";

export default function FlagsEditor({ flags, defaults }: FlagsEditorProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(flags);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setDraft(flags);
    }
  }

  function handleSave() {
    applyFlags(draft, defaults);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleOpenChange}
      triggerId={FLAGS_EDITOR_TRIGGER_ID}
    >
      <Dialog.Trigger id={FLAGS_EDITOR_TRIGGER_ID} render={<Button />}>
        Edit flags
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Intro>
            <Dialog.Title>Flags</Dialog.Title>
          </Dialog.Intro>
          <Dialog.List>
            {sortFlagEntries(draft).map(([key, value]) => {
              switch (typeof value) {
                case "boolean":
                  return (
                    <Field.Root key={key} name={key}>
                      <Field.Label>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => {
                            setDraft((draft) => ({
                              ...draft,
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
                      <NumberField
                        name={key}
                        value={value}
                        min={0}
                        step={1}
                        onValueChange={(next) => {
                          setDraft((draft) => ({
                            ...draft,
                            [key]: next,
                          }));
                        }}
                      />
                    </Field.Root>
                  );
                default:
                  return assertNever(value);
              }
            })}
          </Dialog.List>
          <Dialog.Actions>
            <Dialog.Close render={<Button />}>Cancel</Dialog.Close>
            <Button onClick={handleSave}>Save</Button>
          </Dialog.Actions>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
