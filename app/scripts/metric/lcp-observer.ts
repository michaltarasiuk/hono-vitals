import {reportMetric} from '@/lib/collect/report';
import {LCP_FLAGS_DEFAULTS} from '@/lib/metric/flags/defaults/lcp';
import {parseFlagsFromSearch} from '@/lib/metric/flags/search-params';
import {loadWebVitals} from '@/lib/metric/load-web-vitals';
import {createMetricReporter} from '@/lib/metric/metric-reporter';
import {lcpObserverOptions} from '@/lib/metric/observer-options';
import {removeLcpElement} from '@/lib/metric/remove-lcp-element';

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
    (metric) =>
      report({
        metric,
        instance: 1,
      }),
    lcpObserverOptions(flags, 1),
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
    (metric) =>
      reportMetric({
        metric,
        instance: 2,
      }),
    lcpObserverOptions(flags, 2),
  );
}
