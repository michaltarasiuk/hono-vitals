import {sendMetric} from '@/lib/collect/send-metrics';
import {LCP_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/observer/load-web-vitals';
import {observerOptions} from '@/lib/metric/observer/options';
import {removeLcpElement} from '@/lib/metric/observer/remove-lcp-element';
import {createMetricReporter} from '@/lib/metric/reporter/reporter';

const flags = parseFlagsFromSearch(LCP_FLAGS_DEFAULTS);

if (flags.removeElement) {
  await removeLcpElement();
}

const {onLCP} = await loadWebVitals({
  attribution: flags.attribution,
  deferLibraryLoad: flags.deferLibraryLoad,
  loadAfterInput: flags.loadAfterInput,
});

const report = createMetricReporter(flags.batchReporting);

function registerLCP() {
  onLCP(
    (m) =>
      report({
        metric: m,
        instance: 1,
      }),
    observerOptions(flags, 1),
  );
}

if (flags.registerOnVisibilityChange) {
  document.addEventListener('visibilitychange', function onVisibilityChange() {
    if (document.visibilityState !== 'visible') {
      return;
    }
    document.removeEventListener('visibilitychange', onVisibilityChange);
    registerLCP();
  });
} else {
  registerLCP();
}

if (flags.secondObserver) {
  onLCP(
    (m) =>
      sendMetric({
        metric: m,
        instance: 2,
      }),
    observerOptions(flags, 2),
  );
}
