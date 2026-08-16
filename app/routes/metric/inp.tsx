import {InpBlockingControls} from '@/app/components/metric/$inp-blocking-controls'
import {Button} from '@/app/components/ui/button'
import {Text} from '@/app/components/ui/text'
import {LOREM_IPSUM} from '@/lib/lorem-ipsum'
import {createMetricRoute} from '@/lib/metric/create-metric-route'
import {
  INP_FLAGS_DEFAULTS,
  type InpFlags,
} from '@/lib/metric/flags/defaults/inp'

export default createMetricRoute({
  metricName: 'INP',
  defaults: INP_FLAGS_DEFAULTS,
  Component: INP,
})

function INP({flags}: {flags: InpFlags}) {
  return (
    <>
      <Text>{LOREM_IPSUM}</Text>
      <Button type="button" data-target="inp-target">
        Click
      </Button>
      <input
        type="text"
        data-target="inp-keyboard"
        aria-label="Keyboard target"
      />
      <InpBlockingControls flags={flags} />
    </>
  )
}
