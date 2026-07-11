import { Switch as BaseSwitch } from "@base-ui/react/switch";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      className={className ? `Switch ${className}` : "Switch"}
      {...props}
    >
      <BaseSwitch.Thumb className="Thumb" />
    </BaseSwitch.Root>
  );
}
