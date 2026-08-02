import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { cx } from "@/lib/cx";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root className={cx("Switch", className)} {...props}>
      <BaseSwitch.Thumb className="Thumb" />
    </BaseSwitch.Root>
  );
}
