import { reactRenderer } from "@hono/react-renderer";

import { Metric } from "@/app/components/metric/metric";
import { FlagsEditor } from "@/app/islands/metric/flags-editor";

export default reactRenderer(
  ({ children, Layout, metric, flags, defaults }) => {
    return (
      <Layout>
        <Metric.Provider metric={metric} flags={flags} defaults={defaults}>
          <Metric.Toolbar>
            <FlagsEditor flags={flags} defaults={defaults} />
          </Metric.Toolbar>
          <Metric.Main>
            <Metric.Assets />
            <Metric.Content>{children}</Metric.Content>
            <Metric.Prerender />
          </Metric.Main>
        </Metric.Provider>
      </Layout>
    );
  },
);
