import {zValidator} from '@hono/zod-validator'
import {createRoute} from 'honox/factory'
import {Script} from 'honox/server'

import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {
  FCP_FLAGS_DEFAULTS,
  type FcpFlags,
} from '@/lib/metric/flags/defaults/fcp'
import {flagsSchema} from '@/lib/metric/flags/schema'

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

export default createRoute(
  zValidator('query', flagsSchema(FCP_FLAGS_DEFAULTS)),
  (c) => {
    const flags = c.req.valid('query')

    return c.render(
      <>
        <FcpContent flags={flags} />
        <Script src="/app/scripts/metric/fcp-observer.ts" />
      </>,
      {
        metricName: 'FCP',
        flags,
        defaults: FCP_FLAGS_DEFAULTS,
      },
    )
  },
)
