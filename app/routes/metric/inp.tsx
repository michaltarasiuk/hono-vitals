import {InpBlockingControls} from '@/app/components/metric/$inp-blocking-controls'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {LOREM_IPSUM} from '@/lib/lorem-ipsum'
import {createMetricRoute} from '@/lib/metric/create-metric-route'
import {INP_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/inp'

export default createMetricRoute({
  metricName: 'INP',
  defaults: INP_FLAGS_DEFAULTS,
  children: (flags) => (
    <>
      <Heading elementtiming="main-heading">INP Test</Heading>
      <Text>{LOREM_IPSUM}</Text>
      <InpBlockingControls flags={flags} />
    </>
  ),
})
