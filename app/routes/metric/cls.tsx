import {zValidator} from '@hono/zod-validator'
import {createRoute} from 'honox/factory'
import {Script} from 'honox/server'

import {SquareImage} from '@/app/components/metric/square-image'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {
  CLS_FLAGS_DEFAULTS,
  type ClsFlags,
} from '@/lib/metric/flags/defaults/cls'
import {flagsSchema} from '@/lib/metric/flags/schema'

function ClsContent({flags}: {flags: ClsFlags}) {
  return (
    <>
      <Heading elementtiming="main-heading">CLS Test</Heading>
      {flags.noLayoutShifts ? (
        <Text>This text does not shift.</Text>
      ) : (
        <>
          <Text>
            <SquareImage
              elementtiming="main-image"
              delay={500}
              hidden={flags.imgHidden}
            />{' '}
            [text node contents]
          </Text>
          <Text data-target="secondary-image-wrapper">
            <SquareImage
              elementtiming="secondary-image"
              delay={1000}
              hidden={flags.imgHidden2}
            />
          </Text>
          <Text>Text below the images that will get pushed down.</Text>
        </>
      )}
    </>
  )
}

export default createRoute(
  zValidator('query', flagsSchema(CLS_FLAGS_DEFAULTS)),
  (c) => {
    const flags = c.req.valid('query')

    return c.render(
      <>
        <ClsContent flags={flags} />
        <Script src="/app/scripts/metric/cls-observer.ts" />
      </>,
      {
        metricName: 'CLS',
        flags,
        defaults: CLS_FLAGS_DEFAULTS,
      },
    )
  },
)
