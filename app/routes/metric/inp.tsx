import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {InpBlockingControls} from '@/app/islands/inp-blocking-controls'
import {InpObserver} from '@/app/islands/observers/inp-observer'
import {LOREM_IPSUM} from '@/lib/lorem-ipsum'
import {createMetricRoute} from '@/lib/metric/create-route'
import {
  INP_FLAGS_DEFAULTS,
  type InpFlags,
} from '@/lib/metric/flags/defaults/inp'

function InpContent({flags}: {flags: InpFlags}) {
  return (
    <>
      <Heading elementtiming="main-heading">INP Test</Heading>
      <Text>{LOREM_IPSUM}</Text>
      <InpBlockingControls flags={flags} />
    </>
  )
}

export default createMetricRoute({
  name: 'INP',
  defaults: INP_FLAGS_DEFAULTS,
  Observer: InpObserver,
  Content: InpContent,
})
