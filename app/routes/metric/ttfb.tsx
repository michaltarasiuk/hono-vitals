import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {TtfbObserver} from '@/app/islands/observers/ttfb-observer'
import {createMetricRoute} from '@/lib/metric/create-route'
import {
  TTFB_FLAGS_DEFAULTS,
  type TtfbFlags,
} from '@/lib/metric/flags/defaults/ttfb'

function TtfbContent({flags}: {flags: TtfbFlags}) {
  return (
    <>
      <Heading elementtiming="main-heading">TTFB Test</Heading>
      <Text>
        <SquareImage
          elementtiming="main-image"
          delay={flags.imgDelay}
          hidden={flags.imgHidden}
        />
      </Text>
      <Text>Text below the image</Text>
    </>
  )
}

export default createMetricRoute({
  name: 'TTFB',
  defaults: TTFB_FLAGS_DEFAULTS,
  Observer: TtfbObserver,
  Content: TtfbContent,
})
