import {DelayedImage} from '@/app/components/metric/delayed-image';
import {Text} from '@/app/components/ui/text';
import {CLS_FLAGS_DEFAULTS, type ClsFlags} from '@/lib/metric/flags/defaults';
import {createMetricRoute} from '@/lib/metric/route';

export default createMetricRoute({
  metricName: 'CLS',
  defaults: CLS_FLAGS_DEFAULTS,
  Component: CLS,
});

function CLS({flags}: {flags: ClsFlags}) {
  if (flags.noLayoutShifts) {
    return <Text>This text does not shift.</Text>;
  }
  return (
    <>
      <Text>
        <DelayedImage delay={500} hidden={flags.imgHidden} />
        {' [text node contents]'}
      </Text>
      <Text data-target="secondary-image-wrapper">
        <DelayedImage
          elementtiming="secondary-image"
          delay={1000}
          hidden={flags.imgHidden2}
        />
      </Text>
      <Text>Text below the image.</Text>
    </>
  );
}
