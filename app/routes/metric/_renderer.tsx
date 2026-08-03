import { reactRenderer } from "@hono/react-renderer";

import { FlagsEditor } from "@/app/islands/metric/flags-editor";
import { MetricPage } from "@/app/components/metric/metric-page";
import { MetricToasts } from "@/app/islands/metric/metric-toasts";

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
          <MetricToasts />
        </MetricPage.Provider>
      </Layout>
    );
  },
);
