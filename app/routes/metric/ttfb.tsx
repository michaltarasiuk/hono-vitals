import {zValidator} from '@hono/zod-validator'
import {createRoute} from 'honox/factory'

import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {TtfbObserver} from '@/app/routes/metric/$ttfb-observer'
import {
  TTFB_FLAGS_DEFAULTS,
  type TtfbFlags,
} from '@/lib/metric/flags/defaults/ttfb'
import {flagsSchema} from '@/lib/metric/flags/schema'

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

export default createRoute(
  zValidator('query', flagsSchema(TTFB_FLAGS_DEFAULTS)),
  (c) => {
    const flags = c.req.valid('query')

    return c.render(
      <>
        <TtfbContent flags={flags} />
        <TtfbObserver flags={flags} />
      </>,
      {
        metricName: 'TTFB',
        flags,
        defaults: TTFB_FLAGS_DEFAULTS,
      },
    )
  },
)
