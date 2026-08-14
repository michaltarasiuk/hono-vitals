import {zValidator} from '@hono/zod-validator'
import {createRoute} from 'honox/factory'
import {Script} from 'honox/server'

import {InpBlockingControls} from '@/app/components/metric/$inp-blocking-controls'
import {Heading} from '@/app/components/ui/heading'
import {Text} from '@/app/components/ui/text'
import {LOREM_IPSUM} from '@/lib/lorem-ipsum'
import {
  INP_FLAGS_DEFAULTS,
  type InpFlags,
} from '@/lib/metric/flags/defaults/inp'
import {flagsSchema} from '@/lib/metric/flags/schema'

function InpContent({flags}: {flags: InpFlags}) {
  return (
    <>
      <Heading elementtiming="main-heading">INP Test</Heading>
      <Text>{LOREM_IPSUM}</Text>
      <InpBlockingControls flags={flags} />
    </>
  )
}

export default createRoute(
  zValidator('query', flagsSchema(INP_FLAGS_DEFAULTS)),
  (c) => {
    const flags = c.req.valid('query')

    return c.render(
      <>
        <InpContent flags={flags} />
        <Script src="/app/scripts/metric/inp-observer.ts" />
      </>,
      {
        metricName: 'INP',
        flags,
        defaults: INP_FLAGS_DEFAULTS,
      },
    )
  },
)
