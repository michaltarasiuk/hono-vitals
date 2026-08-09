import {showRoutes} from 'hono/dev'
import {createApp} from 'honox/server'

import {migrate} from '@/lib/analytics/duckdb/schema'

await migrate()

const app = createApp()

showRoutes(app)

export default app
