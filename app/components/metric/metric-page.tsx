import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {cx} from '@/lib/cx'

function MetricPageHeading({children}: {children: React.ReactNode}) {
  return <Heading elementtiming="main-heading">{children}</Heading>
}

type MetricPageImageProps = Omit<
  React.ComponentProps<typeof SquareImage>,
  'className'
> & {
  className?: string
  /** Sets `data-target` on the wrapper for attribution generateTarget. */
  target?: string
}

function MetricPageImage({
  className,
  target,
  ...imageProps
}: MetricPageImageProps) {
  return (
    <div className={cx('MetricImage', className)} data-target={target}>
      <SquareImage {...imageProps} />
    </div>
  )
}

export const MetricPage = {
  Heading: MetricPageHeading,
  Image: MetricPageImage,
}
