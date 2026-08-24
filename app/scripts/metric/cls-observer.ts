import {reportMetric} from '@/lib/collect/report';
import {CLS_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/load-web-vitals';
import {createMetricReporter} from '@/lib/metric/metric-reporter';
import {observerOptions} from '@/lib/metric/observer-options';

const flags = parseFlagsFromSearch(CLS_FLAGS_DEFAULTS);

const {onCLS} = await loadWebVitals({
  attribution: flags.attribution,
  deferLibraryLoad: flags.deferLibraryLoad,
  loadAfterInput: flags.loadAfterInput,
});

const report = createMetricReporter(flags.batchReporting);

onCLS(
  (m) =>
    report({
      metric: m,
      instance: 1,
    }),
  observerOptions(flags, 1),
);

if (flags.secondObserver) {
  onCLS(
    (m) =>
      reportMetric({
        metric: m,
        instance: 2,
      }),
    observerOptions(flags, 2),
  );
}
