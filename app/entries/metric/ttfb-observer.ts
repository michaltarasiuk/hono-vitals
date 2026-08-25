import {sendMetric} from '@/lib/collect/send-metrics';
import {TTFB_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/observer/load-web-vitals';
import {observerOptions} from '@/lib/metric/observer/options';
import {overrideResponseStart} from '@/lib/metric/observer/override-response-start';
import {createMetricReporter} from '@/lib/metric/reporter/reporter';

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
      sendMetric({
        metric: m,
        instance: 2,
      }),
    observerOptions(flags, 2),
  );
}
