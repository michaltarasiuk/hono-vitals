import {showRoutes} from 'hono/dev';
import {createApp} from 'honox/server';

import {migrate} from '@/lib/db/migrate';

await migrate();

const app = createApp();

showRoutes(app);

export default app;
