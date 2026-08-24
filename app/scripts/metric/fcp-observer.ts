import {reportMetric} from '@/lib/collect/report';
import {FCP_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/fcp';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/load-web-vitals';
import {createMetricReporter} from '@/lib/metric/metric-reporter';
import {observerOptions} from '@/lib/metric/observer-options';

const flags = parseFlagsFromSearch(FCP_FLAGS_DEFAULTS);

const {onFCP} = await loadWebVitals({
  attribution: flags.attribution,
  deferLibraryLoad: flags.deferLibraryLoad,
  loadAfterInput: flags.loadAfterInput,
});

const report = createMetricReporter(flags.batchReporting);

onFCP(
  (metric) =>
    report({
      metric,
      instance: 1,
    }),
  observerOptions(flags, 1),
);

if (flags.secondObserver) {
  onFCP(
    (metric) =>
      reportMetric({
        metric,
        instance: 2,
      }),
    observerOptions(flags, 2),
  );
}
