import {cn} from '@/lib/cn';

export function Text({className, ...props}: React.ComponentProps<'p'>) {
  return <p className={cn('Text', className)} {...props} />;
}
