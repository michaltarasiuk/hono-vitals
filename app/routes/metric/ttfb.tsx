import {zValidator} from '@hono/zod-validator'
import {createRoute} from 'honox/factory'
import {Script} from 'honox/server'

import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {TTFB_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/ttfb'
import {flagsSchema} from '@/lib/metric/flags/schema'

export default createRoute(
  zValidator('query', flagsSchema(TTFB_FLAGS_DEFAULTS)),
  (c) => {
    const flags = c.req.valid('query')

    return c.render(
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
        <Script src="/app/scripts/metric/ttfb-observer.ts" />
      </>,
      {
        metricName: 'TTFB',
        flags,
        defaults: TTFB_FLAGS_DEFAULTS,
      },
    )
  },
)
