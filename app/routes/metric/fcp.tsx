import {DelayedImage} from '@/app/components/metric/delayed-image'
import {Text} from '@/app/components/ui/text'
import {
  FCP_FLAGS_DEFAULTS,
  type FcpFlags,
} from '@/lib/metric/flags/defaults/fcp'
import {createMetricRoute} from '@/lib/metric/metric-route'

export default createMetricRoute({
  metricName: 'FCP',
  defaults: FCP_FLAGS_DEFAULTS,
  Component: FCP,
})

function FCP({flags}: {flags: FcpFlags}) {
  return (
    <>
      <DelayedImage delay={flags.imgDelay} hidden={flags.imgHidden} />
      <Text>Text below the image.</Text>
    </>
  )
}
