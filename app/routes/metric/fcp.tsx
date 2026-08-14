import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {createMetricRoute} from '@/lib/metric/create-metric-route'
import {FCP_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/fcp'

export default createMetricRoute({
  metricName: 'FCP',
  defaults: FCP_FLAGS_DEFAULTS,
  children: (flags) => (
    <>
      <Heading elementtiming="main-heading">FCP Test</Heading>
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
