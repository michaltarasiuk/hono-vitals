import {Spacer} from '@/app/components/metric/spacer'
import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {LcpObserver} from '@/app/islands/observers/lcp-observer'
import {createMetricRoute} from '@/lib/metric/create-route'
import {
  LCP_FLAGS_DEFAULTS,
  type LcpFlags,
} from '@/lib/metric/flags/defaults/lcp'

function LcpContent({flags}: {flags: LcpFlags}) {
  return (
    <>
      <Heading elementtiming="main-heading">LCP Test</Heading>
      <Text>
        <SquareImage
          id={flags.removeElement ? 'lcp-image' : undefined}
          data-target="main-image"
          elementtiming="main-image"
          delay={flags.imgDelay}
          hidden={flags.imgHidden}
        />
      </Text>
      <Text>Text below the image</Text>
      <Spacer />
      <Text>Text below the full-height element.</Text>
    </>
  )
}

export default createMetricRoute({
  name: 'LCP',
  defaults: LCP_FLAGS_DEFAULTS,
  Observer: LcpObserver,
  Content: LcpContent,
})
