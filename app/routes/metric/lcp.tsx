import {DelayedImage} from '@/app/components/metric/delayed-image'
import {Spacer} from '@/app/components/metric/spacer'
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
      <DelayedImage
        id={flags.removeElement ? 'lcp-image' : undefined}
        data-target="main-image"
        delay={flags.imgDelay}
        hidden={flags.imgHidden}
      />
      <Text>Text below the image.</Text>
      <Spacer />
      <Text>Text below the spacer.</Text>
    </>
  )
}
