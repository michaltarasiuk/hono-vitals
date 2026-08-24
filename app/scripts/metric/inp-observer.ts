import {reportMetric} from '@/lib/collect/report';
import {INP_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/inp';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/load-web-vitals';
import {createMetricReporter} from '@/lib/metric/metric-reporter';
import {observerOptions} from '@/lib/metric/observer-options';

const flags = parseFlagsFromSearch(INP_FLAGS_DEFAULTS);

const {onINP} = await loadWebVitals({
  attribution: flags.attribution,
  deferLibraryLoad: flags.deferLibraryLoad,
  loadAfterInput: flags.loadAfterInput,
});

const report = createMetricReporter(flags.batchReporting);

onINP(
  (m) =>
    report({
      metric: m,
      instance: 1,
    }),
  observerOptions(flags, 1),
);

if (flags.secondObserver) {
  onINP(
    (m) =>
      reportMetric({
        metric: m,
        instance: 2,
      }),
    observerOptions(flags, 2),
  );
}
