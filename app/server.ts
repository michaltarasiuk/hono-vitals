import { createApp } from "honox/server";
import { showRoutes } from "hono/dev";

import { migrate } from "@/lib/analytics/duckdb/schema";

await migrate();

const app = createApp();

showRoutes(app);

export default app;
