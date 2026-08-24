import {cn} from '@/lib/cn'

export function Heading({className, ...props}: React.ComponentProps<'h1'>) {
  return <h1 className={cn('Heading', className)} {...props} />
}
