import {Switch as BaseSwitch} from '@base-ui/react/switch'

import {cn} from '@/lib/cn'

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root className={cn('Switch', className)} {...props}>
      <BaseSwitch.Thumb className="Thumb" />
    </BaseSwitch.Root>
  )
}
