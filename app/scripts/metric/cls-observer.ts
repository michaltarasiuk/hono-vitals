import {reportMetric} from '@/lib/collect/report'
import {CLS_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/cls'
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params'
import {loadWebVitals} from '@/lib/metric/load-web-vitals'
import {createMetricReporter} from '@/lib/metric/metric-reporter'
import {clsObserverOptions} from '@/lib/metric/observer-options'

const flags = parseFlagsFromSearch(CLS_FLAGS_DEFAULTS)

const {onCLS} = await loadWebVitals({
  attribution: flags.attribution,
  deferLibraryLoad: flags.deferLibraryLoad,
  loadAfterInput: flags.loadAfterInput,
})

const report = createMetricReporter(flags.batchReporting)

onCLS(
  (metric) =>
    report({
      metric,
      instance: 1,
    }),
  clsObserverOptions(flags, 1),
)

if (flags.secondObserver) {
  onCLS(
    (metric) =>
      reportMetric({
        metric,
        instance: 2,
      }),
    clsObserverOptions(flags, 2),
  )
}
