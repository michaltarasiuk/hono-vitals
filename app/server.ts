import {showRoutes} from 'hono/dev'
import {createApp} from 'honox/server'

import {migrate} from '@/lib/analytics/db'

await migrate()

const app = createApp()

showRoutes(app)

export default app
