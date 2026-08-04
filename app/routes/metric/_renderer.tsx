import { reactRenderer } from "@hono/react-renderer";

import { MetricPage } from "@/app/components/metric/metric-page";
import { FlagsEditor } from "@/app/islands/flags-editor";
import { MetricToasts } from "@/app/islands/metric-toasts";

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
