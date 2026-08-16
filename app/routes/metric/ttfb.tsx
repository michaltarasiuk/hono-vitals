import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {createMetricRoute} from '@/lib/metric/create-metric-route'
import {
  TTFB_FLAGS_DEFAULTS,
  type TtfbFlags,
} from '@/lib/metric/flags/defaults/ttfb'

export default createMetricRoute({
  metricName: 'TTFB',
  defaults: TTFB_FLAGS_DEFAULTS,
  Component: TTFB,
})

function TTFB({flags}: {flags: TtfbFlags}) {
  return (
    <>
      <Heading elementtiming="main-heading">TTFB</Heading>
      <Text>
        <SquareImage
          elementtiming="main-image"
          delay={flags.imgDelay}
          hidden={flags.imgHidden}
        />
      </Text>
      <Text>Text below the image</Text>
    </>
  )
}
