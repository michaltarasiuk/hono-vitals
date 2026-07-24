import { reactRenderer } from "@hono/react-renderer";

import { MetricPage } from "@/app/components/metric/metric-page";
import { FlagsEditor } from "@/app/islands/metric/flags-editor";

export default reactRenderer(
  ({ children, Layout, metric, flags, defaults }) => {
    return (
      <Layout>
        <MetricPage.Provider metric={metric} flags={flags} defaults={defaults}>
          <MetricPage.Toolbar>
            <FlagsEditor flags={flags} defaults={defaults} />
          </MetricPage.Toolbar>
          <MetricPage.Main>
            <MetricPage.DelayedScripts />
            <MetricPage.Content>{children}</MetricPage.Content>
            <MetricPage.PrerenderHints />
          </MetricPage.Main>
        </MetricPage.Provider>
      </Layout>
    );
  },
);
