import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {createMetricRoute} from '@/lib/metric/create-metric-route'
import {TTFB_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/ttfb'

export default createMetricRoute({
  metricName: 'TTFB',
  defaults: TTFB_FLAGS_DEFAULTS,
  children: (flags) => (
    <>
      <Heading elementtiming="main-heading">TTFB Test</Heading>
      <Text>
        <SquareImage
          elementtiming="main-image"
          delay={flags.imgDelay}
          hidden={flags.imgHidden}
        />
      </Text>
      <Text>Text below the image</Text>
    </>
  ),
})
