import { createRoute } from "honox/factory";

import { MetricNav } from "@/app/components/metric/nav";

export default createRoute((c) => {
  return c.render(
    <>
      <MetricNav currentPath={c.req.path} />
      <main className="metric-test">
        <h1>Web Vitals Test</h1>
        <p>Select a metric from the navigation above.</p>
      </main>
    </>,
  );
});
