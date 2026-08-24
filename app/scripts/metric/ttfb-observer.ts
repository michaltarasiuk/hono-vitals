import {reportMetric} from '@/lib/collect/report';
import {TTFB_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/ttfb';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/load-web-vitals';
import {createMetricReporter} from '@/lib/metric/metric-reporter';
import {observerOptions} from '@/lib/metric/observer-options';
import {overrideResponseStart} from '@/lib/metric/override-response-start';

const flags = parseFlagsFromSearch(TTFB_FLAGS_DEFAULTS);

if (flags.responseStart) {
  overrideResponseStart(flags.responseStart);
}

const {onTTFB} = await loadWebVitals({
  attribution: flags.attribution,
  deferLibraryLoad: flags.deferLibraryLoad,
  loadAfterInput: flags.loadAfterInput,
});

const report = createMetricReporter(flags.batchReporting);

onTTFB(
  (m) =>
    report({
      metric: m,
      instance: 1,
    }),
  observerOptions(flags, 1),
);

if (flags.secondObserver) {
  onTTFB(
    (m) =>
      reportMetric({
        metric: m,
        instance: 2,
      }),
    observerOptions(flags, 2),
  );
}
