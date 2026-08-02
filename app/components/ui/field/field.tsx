import { Field as BaseField } from "@base-ui/react/field";

import { cx } from "@/lib/cx";

function Root({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root className={cx("Field", className)} {...props}>
      {children}
    </BaseField.Root>
  );
}

function Label({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label className={cx("Label", className)} {...props}>
      {children}
    </BaseField.Label>
  );
}

export const Field = {
  Label,
  Root,
};
