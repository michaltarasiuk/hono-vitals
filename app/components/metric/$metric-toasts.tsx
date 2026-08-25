import {useEffect} from 'react';

import {Toast} from '@/app/components/ui/toast';
import {formatMetricRating, formatMetricValue} from '@/lib/metric/format';
import {subscribeMetricToasts} from '@/lib/metric/toast';

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
  const {add} = Toast.useToastManager();

  useEffect(() => {
    return subscribeMetricToasts((m) => {
      add({
        id: m.id,
        title: `${m.name} ${formatMetricValue(m.name, m.value)}`,
        description: formatMetricRating(m.rating),
      });
    });
  }, [add]);

  return null;
}
