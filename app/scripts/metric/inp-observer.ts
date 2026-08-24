import {reportMetric} from '@/lib/collect/report';
import {INP_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/observer/load-web-vitals';
import {observerOptions} from '@/lib/metric/observer/options';
import {createMetricReporter} from '@/lib/metric/report/reporter';

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
