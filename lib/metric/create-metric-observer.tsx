import type { Metric } from "web-vitals";

import { useEffect } from "react";

import type { MetricName } from "@/lib/collect/metric-schema";

import { assertNever } from "@/lib/assert-never";
import { type ReportedMetric, reportMetric } from "@/lib/collect/report-metric";
import { isDefined } from "@/lib/is-defined";
import {
  type BatchReporter,
  createBatchReporter,
} from "@/lib/metric/batch-reporter";
import { loadWebVitals } from "@/lib/metric/load-web-vitals";
import {
  buildObserverOptions,
  OBSERVER_RECIPES,
  type ObserverInstance,
  type ObserverOptions,
} from "@/lib/metric/observer-options";

type WebVitalsModule = Awaited<ReturnType<typeof loadWebVitals>>;

type ObserveFn = (
  callback: (metric: Metric) => void,
  options?: ObserverOptions,
) => void;

export interface MetricObserverFlags {
  attribution: boolean;
  deferLibraryLoad: boolean;
  loadAfterInput: boolean;
  batchReporting: boolean;
  secondObserver: boolean;
  reportAllChanges: boolean;
  reportAllChanges2: boolean;
}

type WaitUntil = "immediate" | "visible";

interface CreateMetricObserverConfig<T extends MetricObserverFlags> {
  name: MetricName;
  observe: (webVitals: WebVitalsModule) => ObserveFn;
  /** Sync work on mount, before the async observe path. */
  onMount?: (flags: T) => void;
  /** Async work before `web-vitals` is loaded. */
  prepare?: (flags: T) => void | Promise<void>;
  /**
   * When to register the primary observer.
   * Second observers always register immediately.
   * @default "immediate"
   */
  waitUntil?: WaitUntil | ((flags: T) => WaitUntil);
}

export function createMetricObserver<T extends MetricObserverFlags>(
  config: CreateMetricObserverConfig<T>,
) {
  const recipe = recipeFor(config.name);

  function MetricObserver({ flags }: { flags: T }) {
    useEffect(() => {
      config.onMount?.(flags);

      let ignore = false;
      let dispose: (() => void) | null = null;

      void (async () => {
        await config.prepare?.(flags);

        if (ignore) {
          return;
        }

        const webVitals = await loadWebVitals({
          attribution: flags.attribution,
          deferLibraryLoad: flags.deferLibraryLoad,
          loadAfterInput: flags.loadAfterInput,
        });

        if (ignore) {
          return;
        }

        const observe = config.observe(webVitals);
        const disposers: Array<() => void> = [];

        let batch: BatchReporter | null = null;
        if (flags.batchReporting) {
          batch = createBatchReporter();
          disposers.push(batch.dispose);
        }

        function report(metric: Metric, instance: ObserverInstance) {
          const reported: ReportedMetric = { metric, instance };

          if (isDefined(batch)) {
            batch.enqueue(reported);
          } else {
            reportMetric(reported);
          }
        }

        function register(instance: ObserverInstance) {
          observe(
            (metric) => {
              report(metric, instance);
            },
            buildObserverOptions(recipe, flags, instance),
          );
        }

        const waitUntil = resolveWaitUntil(config.waitUntil, flags);
        const primaryDispose = scheduleRegister(waitUntil, () => {
          register(1);
        });
        if (isDefined(primaryDispose)) {
          disposers.push(primaryDispose);
        }

        if (flags.secondObserver) {
          register(2);
        }

        dispose = () => {
          for (const disposeOne of disposers) {
            disposeOne();
          }
        };

        if (ignore) {
          dispose();
        }
      })();

      return () => {
        ignore = true;
        dispose?.();
      };
    }, [flags]);

    return null;
  }

  MetricObserver.displayName = `${config.name}Observer`;
  return MetricObserver;
}

function recipeFor(name: MetricName) {
  switch (name) {
    case "CLS":
      return OBSERVER_RECIPES.cls;
    case "FCP":
      return OBSERVER_RECIPES.fcp;
    case "INP":
      return OBSERVER_RECIPES.inp;
    case "LCP":
      return OBSERVER_RECIPES.lcp;
    case "TTFB":
      return OBSERVER_RECIPES.ttfb;
    default:
      return assertNever(name);
  }
}

function resolveWaitUntil<T>(
  waitUntil: WaitUntil | ((flags: T) => WaitUntil) | undefined,
  flags: T,
): WaitUntil {
  if (!isDefined(waitUntil)) {
    return "immediate";
  }
  return typeof waitUntil === "function" ? waitUntil(flags) : waitUntil;
}

function scheduleRegister(waitUntil: WaitUntil, register: () => void) {
  switch (waitUntil) {
    case "immediate":
      register();
      return;
    case "visible": {
      function onVisibilityChange() {
        if (document.visibilityState === "visible") {
          register();
        }
      }

      document.addEventListener("visibilitychange", onVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }
    default:
      return assertNever(waitUntil);
  }
}
