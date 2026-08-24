import {DelayedImage} from '@/app/components/metric/delayed-image';
import {Text} from '@/app/components/ui/text';
import {TTFB_FLAGS_DEFAULTS, type TtfbFlags} from '@/lib/metric/flags/defaults';
import {createMetricRoute} from '@/lib/metric/metric-route';

export default createMetricRoute({
  metricName: 'TTFB',
  defaults: TTFB_FLAGS_DEFAULTS,
  Component: TTFB,
});

function TTFB({flags}: {flags: TtfbFlags}) {
  return (
    <>
      <DelayedImage delay={flags.imgDelay} hidden={flags.imgHidden} />
      <Text>Text below the image.</Text>
    </>
  );
}
