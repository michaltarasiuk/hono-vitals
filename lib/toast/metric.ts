import type {Metric} from 'web-vitals'

const METRIC_TOAST_EVENT = 'hono-vitals:metric-toast'

export function toastMetric(metric: Metric) {
  dispatchEvent(new CustomEvent<Metric>(METRIC_TOAST_EVENT, {detail: metric}))
}

export function subscribeMetricToasts(onMetric: (metric: Metric) => void) {
  function handleMetricToast(event: Event) {
    onMetric((event as CustomEvent<Metric>).detail)
  }

  addEventListener(METRIC_TOAST_EVENT, handleMetricToast)
  return () => removeEventListener(METRIC_TOAST_EVENT, handleMetricToast)
}
