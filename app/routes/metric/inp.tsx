import {InpBlockingControls} from '@/app/components/metric/$inp-blocking-controls';
import {Text} from '@/app/components/ui/text';
import {LOREM_IPSUM} from '@/lib/lorem-ipsum';
import {INP_FLAGS_DEFAULTS, type InpFlags} from '@/lib/metric/flags/defaults';
import {createMetricRoute} from '@/lib/metric/route';

export default createMetricRoute({
  metricName: 'INP',
  defaults: INP_FLAGS_DEFAULTS,
  Component: INP,
});

function INP({flags}: {flags: InpFlags}) {
  return (
    <>
      <Text>{LOREM_IPSUM}</Text>
      <InpBlockingControls flags={flags} />
    </>
  );
}
