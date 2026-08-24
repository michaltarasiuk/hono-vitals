import {Button as BaseButton} from '@base-ui/react/button'

import {cn} from '@/lib/cn'

export function Button({
  className,
  ...props
}: React.ComponentProps<typeof BaseButton>) {
  return <BaseButton className={cn('Button', className)} {...props} />
}
