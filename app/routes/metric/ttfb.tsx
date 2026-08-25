import {DelayedImage} from '@/app/components/metric/delayed-image';
import {Text} from '@/app/components/ui/text';
import {createMetricRoute} from '@/lib/metric/create-route';
import {TTFB_FLAGS_DEFAULTS, type TtfbFlags} from '@/lib/metric/flags/defaults';

export default createMetricRoute({
  metricName: 'TTFB',
  defaults: TTFB_FLAGS_DEFAULTS,
  Component: TtfbPage,
});

function TtfbPage({flags}: {flags: TtfbFlags}) {
  return (
    <>
      <DelayedImage delay={flags.imgDelay} hidden={flags.imgHidden} />
      <Text>Text below the image.</Text>
    </>
  );
}
