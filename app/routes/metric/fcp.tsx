import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {FcpObserver} from '@/app/islands/observers/fcp-observer'
import {createMetricRoute} from '@/lib/metric/create-route'
import {
  FCP_FLAGS_DEFAULTS,
  type FcpFlags,
} from '@/lib/metric/flags/defaults/fcp'

function FcpContent({flags}: {flags: FcpFlags}) {
  return (
    <>
      <Heading elementtiming="main-heading">FCP Test</Heading>
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
  name: 'FCP',
  defaults: FCP_FLAGS_DEFAULTS,
  Observer: FcpObserver,
  Content: FcpContent,
})
