import { Field as BaseField } from "@base-ui/react/field";

function Root({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseField.Root>) {
  return (
    <BaseField.Root
      className={className ? `Field ${className}` : "Field"}
      {...props}
    >
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
    <BaseField.Label
      className={className ? `Label ${className}` : "Label"}
      {...props}
    >
      {children}
    </BaseField.Label>
  );
}

export const Field = {
  Label,
  Root,
};
