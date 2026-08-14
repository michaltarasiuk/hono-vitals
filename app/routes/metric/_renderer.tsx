import {reactRenderer} from '@hono/react-renderer'

import {MetricLayout} from '@/app/components/metric/layout'
import {FlagsEditor} from '@/app/routes/metric/$flags-editor'
import {MetricToasts} from '@/app/routes/metric/$metric-toasts'

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
    )
  },
)
