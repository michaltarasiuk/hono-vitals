import {Spacer} from '@/app/components/metric/spacer'
import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {createMetricRoute} from '@/lib/metric/create-metric-route'
import {
  LCP_FLAGS_DEFAULTS,
  type LcpFlags,
} from '@/lib/metric/flags/defaults/lcp'

export default createMetricRoute({
  metricName: 'LCP',
  defaults: LCP_FLAGS_DEFAULTS,
  Component: LCP,
})

function LCP({flags}: {flags: LcpFlags}) {
  return (
    <>
      <Heading elementtiming="main-heading">LCP Test</Heading>
      <Text>
        <SquareImage
          id={flags.removeElement ? 'lcp-image' : undefined}
          data-target="main-image"
          elementtiming="main-image"
          delay={flags.imgDelay}
          hidden={flags.imgHidden}
        />
      </Text>
      <Text>Text below the image</Text>
      <Spacer />
      <Text>Text below the full-height element.</Text>
    </>
  )
}
