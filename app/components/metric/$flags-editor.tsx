import {useState} from 'react';

import {Header} from '@/app/components/header';
import {Button} from '@/app/components/ui/button';
import {Dialog} from '@/app/components/ui/dialog';
import {Field} from '@/app/components/ui/field';
import {NumberField} from '@/app/components/ui/number-field';
import {Switch} from '@/app/components/ui/switch';
import {islandId} from '@/lib/island-id';
import {formatFlagLabel} from '@/lib/metric/flags/format-flag-label';
import {navigateWithFlags} from '@/lib/metric/flags/navigate-with-flags';
import {sortFlagEntries} from '@/lib/metric/flags/sort-flag-entries';

import type {Flags} from '@/lib/metric/flags/schema';

const FLAGS_EDITOR_TRIGGER_ID = islandId('metric-flags-trigger');

interface FlagsEditorProps {
  flags: Flags;
  defaults: Flags;
}

export function FlagsEditor({flags, defaults}: FlagsEditorProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(flags);

  function handleOpenChange(o: boolean) {
    setOpen(o);
    if (o) {
      setDraft(flags);
    }
  }

  function handleSave() {
    navigateWithFlags(draft, defaults);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger id={FLAGS_EDITOR_TRIGGER_ID} render={<Button />}>
        <Header.Label full="Edit flags" short="Flags" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Flags</Dialog.Title>
            <Dialog.Description>
              Change the flags and save to reload the page with the new URL.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            {sortFlagEntries(draft).map(([k, v]) => {
              switch (typeof v) {
                case 'boolean':
                  return (
                    <Field.Root key={k} name={k}>
                      <Field.Label>
                        <Switch
                          checked={v}
                          onCheckedChange={(c) => {
                            setDraft((d) => ({
                              ...d,
                              [k]: c,
                            }));
                          }}
                        />
                        {formatFlagLabel(k)}
                      </Field.Label>
                    </Field.Root>
                  );
                case 'number':
                  return (
                    <Field.Root key={k} name={k}>
                      <Field.Label>{formatFlagLabel(k)}</Field.Label>
                      <NumberField.Root
                        name={k}
                        value={v}
                        min={0}
                        step={1}
                        onValueChange={(n) => {
                          setDraft((d) => ({
                            ...d,
                            [k]: n ?? 0,
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
                  return v satisfies never;
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
