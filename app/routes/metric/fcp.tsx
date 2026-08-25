import {DelayedImage} from '@/app/components/metric/delayed-image';
import {Text} from '@/app/components/ui/text';
import {createMetricRoute} from '@/lib/metric/create-route';
import {FCP_FLAGS_DEFAULTS, type FcpFlags} from '@/lib/metric/flags/defaults';

export default createMetricRoute({
  metricName: 'FCP',
  defaults: FCP_FLAGS_DEFAULTS,
  Component: FcpPage,
});

function FcpPage({flags}: {flags: FcpFlags}) {
  return (
    <>
      <DelayedImage delay={flags.imgDelay} hidden={flags.imgHidden} />
      <Text>Text below the image.</Text>
    </>
  );
}
