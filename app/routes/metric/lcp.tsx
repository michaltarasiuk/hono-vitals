import {zValidator} from '@hono/zod-validator'
import {createRoute} from 'honox/factory'
import {Script} from 'honox/server'

import {Spacer} from '@/app/components/metric/spacer'
import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {LCP_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/lcp'
import {flagsSchema} from '@/lib/metric/flags/schema'

export default createRoute(
  zValidator('query', flagsSchema(LCP_FLAGS_DEFAULTS)),
  (c) => {
    const flags = c.req.valid('query')

    return c.render(
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
        <Script src="/app/scripts/metric/lcp-observer.ts" />
      </>,
      {
        metricName: 'LCP',
        flags,
        defaults: LCP_FLAGS_DEFAULTS,
      },
    )
  },
)
