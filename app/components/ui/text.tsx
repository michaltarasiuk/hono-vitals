import {cn} from '@/lib/utils/cn';

export function Text({className, ...props}: React.ComponentProps<'p'>) {
  return <p className={cn('Text', className)} {...props} />;
}
