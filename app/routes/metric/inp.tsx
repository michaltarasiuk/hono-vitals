import {InpBlockingControls} from '@/app/components/metric/$inp-blocking-controls';
import {Text} from '@/app/components/ui/text';
import {LOREM_IPSUM_TEXT} from '@/lib/fixtures/lorem-ipsum';
import {createMetricRoute} from '@/lib/metric/create-route';
import {INP_FLAGS_DEFAULTS, type InpFlags} from '@/lib/metric/flags/defaults';

export default createMetricRoute({
  metricName: 'INP',
  defaults: INP_FLAGS_DEFAULTS,
  Component: InpPage,
});

function InpPage({flags}: {flags: InpFlags}) {
  return (
    <>
      <Text>{LOREM_IPSUM_TEXT}</Text>
      <InpBlockingControls flags={flags} />
    </>
  );
}
