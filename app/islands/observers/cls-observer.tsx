import {useEffect} from 'react'

import type {ClsFlags} from '@/lib/metric/flags/defaults/cls'

import {type ReportedMetric, reportMetric} from '@/lib/collect/report'
import {isDefined} from '@/lib/is-defined'
import {
  type BatchReporter,
  createBatchReporter,
} from '@/lib/metric/batch-reporter'
import {loadWebVitals} from '@/lib/metric/load-web-vitals'
import {observerOptions} from '@/lib/metric/observer-options'

export function ClsObserver({flags}: {flags: ClsFlags}) {
  useEffect(() => {
    let ignore = false
    let dispose: (() => void) | null = null

    void (async () => {
      const {onCLS} = await loadWebVitals({
        attribution: flags.attribution,
        deferLibraryLoad: flags.deferLibraryLoad,
        loadAfterInput: flags.loadAfterInput,
      })

      if (ignore) {
        return
      }

      let batch: BatchReporter | null = null
      if (flags.batchReporting) {
        batch = createBatchReporter()
        dispose = batch.dispose
      }

      onCLS(
        (metric) => {
          const reported: ReportedMetric = {
            metric,
            instance: 1,
          }

          if (isDefined(batch)) {
            batch.enqueue(reported)
          } else {
            reportMetric(reported)
          }
        },
        observerOptions('cls', flags, 1),
      )

      if (flags.secondObserver) {
        onCLS(
          (metric) => {
            reportMetric({
              metric,
              instance: 2,
            })
          },
          observerOptions('cls', flags, 2),
        )
      }

      if (ignore) {
        dispose?.()
      }
    })()

    return () => {
      ignore = true
      dispose?.()
    }
  }, [flags])

  return null
}
