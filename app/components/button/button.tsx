import { Button as BaseButton } from "@base-ui/react/button";

export function Button({
  className,
  ...props
}: React.ComponentProps<typeof BaseButton>) {
  return (
    <BaseButton
      className={className ? `Button ${className}` : "Button"}
      {...props}
    />
  );
}
