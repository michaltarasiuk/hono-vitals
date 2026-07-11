import { createRoute } from "honox/factory";

import { MetricToolbar } from "@/app/components/toolbar";

export default createRoute((c) => {
  return c.render(
    <>
      <MetricToolbar currentPath={c.req.path} />
      <main className="metric-shell">
        <h1>Web Vitals Test</h1>
        <p>Select a metric from the navigation above.</p>
      </main>
    </>,
  );
});
