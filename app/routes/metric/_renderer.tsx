import { reactRenderer } from "@hono/react-renderer";

import { Metric } from "@/app/components/metric/shell";
import { FlagsEditor } from "@/app/islands/flags-editor";

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
            {children}
            <Metric.Chrome />
          </Metric.Main>
        </Metric.Provider>
      </Layout>
    );
  },
);
