import type { Metric } from "web-vitals";

const METRIC_TOAST_EVENT = "hono-vitals:metric-toast";

export function toastMetric(metric: Metric) {
  window.dispatchEvent(
    new CustomEvent<Metric>(METRIC_TOAST_EVENT, { detail: metric }),
  );
}

export function subscribeMetricToasts(onMetric: (metric: Metric) => void) {
  function handleMetricToast(event: Event) {
    onMetric((event as CustomEvent<Metric>).detail);
  }

  window.addEventListener(METRIC_TOAST_EVENT, handleMetricToast);
  return () =>
    window.removeEventListener(METRIC_TOAST_EVENT, handleMetricToast);
}
