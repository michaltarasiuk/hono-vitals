import {reactRenderer} from '@hono/react-renderer';

import {FlagsEditor} from '@/app/components/metric/$flags-editor';
import {MetricToasts} from '@/app/components/metric/$metric-toasts';
import {MetricLayout} from '@/app/components/metric/layout';

export default reactRenderer(
  ({children, Layout, metricName, flags, defaults}) => {
    return (
      <Layout>
        <MetricLayout.Provider
          metricName={metricName}
          flags={flags}
          defaults={defaults}
        >
          <MetricLayout.Toolbar>
            <FlagsEditor flags={flags} defaults={defaults} />
          </MetricLayout.Toolbar>
          <MetricLayout.Main>
            <MetricLayout.DelayedScripts />
            <MetricLayout.Content>{children}</MetricLayout.Content>
            <MetricLayout.PrerenderHints />
          </MetricLayout.Main>
          <MetricToasts />
        </MetricLayout.Provider>
      </Layout>
    );
  },
);
