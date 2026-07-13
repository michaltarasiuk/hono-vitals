import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";

import { registerCollectRoute } from "@/lib/server/collect";
import { registerStaticRoutes } from "@/lib/server/static";
import { registerSummaryRoute } from "@/lib/server/summary";

const app = createApp();

registerStaticRoutes(app);
registerCollectRoute(app);
registerSummaryRoute(app);

showRoutes(app);

export default app;
