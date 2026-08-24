import {reportMetric} from '@/lib/collect/report';
import {TTFB_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/ttfb';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/load-web-vitals';
import {createMetricReporter} from '@/lib/metric/metric-reporter';
import {ttfbObserverOptions} from '@/lib/metric/observer-options';
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
  (metric) =>
    report({
      metric,
      instance: 1,
    }),
  ttfbObserverOptions(flags, 1),
);

if (flags.secondObserver) {
  onTTFB(
    (metric) =>
      reportMetric({
        metric,
        instance: 2,
      }),
    ttfbObserverOptions(flags, 2),
  );
}
