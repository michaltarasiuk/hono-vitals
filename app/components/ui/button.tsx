import {Button as BaseButton} from '@base-ui/react/button'

import {cx} from '@/lib/cx'

export function Button({
  className,
  ...props
}: React.ComponentProps<typeof BaseButton>) {
  return <BaseButton className={cx('Button', className)} {...props} />
}
