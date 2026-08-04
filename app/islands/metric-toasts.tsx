import { useEffect } from "react";

import { Toast } from "@/app/components/ui/toast/toast";
import { formatMetricRating } from "@/lib/analytics/format-metric-rating";
import { formatMetricValue } from "@/lib/analytics/format-metric-value";
import { subscribeMetricToasts } from "@/lib/toast/toast-metric";

export function MetricToasts() {
  return (
    <Toast.Provider>
      <MetricToastBridge />
      <Toast.Portal>
        <Toast.Viewport>
          <Toast.List />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function MetricToastBridge() {
  const { add } = Toast.useToastManager();

  useEffect(() => {
    return subscribeMetricToasts((metric) => {
      add({
        id: metric.id,
        title: `${metric.name} ${formatMetricValue(metric.name, metric.value)}`,
        description: formatMetricRating(metric.rating),
      });
    });
  }, [add]);

  return null;
}
