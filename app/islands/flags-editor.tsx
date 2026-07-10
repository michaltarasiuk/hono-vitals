import { useState } from "react";

import { Button } from "@/app/components/button/button";
import { Dialog } from "@/app/components/dialog/dialog";
import { Field } from "@/app/components/field/field";
import { Switch } from "@/app/components/switch/switch";
import { formatFlagLabel } from "@/utils/format-flag-label";
import { applyFlags } from "@/utils/metric/flags/serialize";

interface FlagsEditorProps {
  flags: Record<string, boolean>;
}

export default function FlagsEditor({ flags }: FlagsEditorProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(flags);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setDraft(flags);
    }
  }

  function handleSave() {
    applyFlags(draft);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger render={<Button />}>Edit flags</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Intro>
            <Dialog.Title>Flags</Dialog.Title>
          </Dialog.Intro>
          <Dialog.List>
            {Object.entries(draft).map(([key, value]) => (
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
            ))}
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
