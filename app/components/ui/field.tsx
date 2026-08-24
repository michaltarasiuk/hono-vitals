import {Field as BaseField} from '@base-ui/react/field';

import {cn} from '@/lib/cn';

function Root({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root className={cn('Field', className)} {...props}>
      {children}
    </BaseField.Root>
  );
}

function Label({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label className={cn('Label', className)} {...props}>
      {children}
    </BaseField.Label>
  );
}

export const Field = {
  Label,
  Root,
};
