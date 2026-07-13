import type { ReactNode } from "react";

import type { FlagValue } from "@/lib/metric/flags/serialize";
import type { MetricSlug } from "@/lib/metric/nav";

import { MetricToolbar } from "@/app/components/layout/toolbar";
import { MetricContext, useMetric } from "@/app/components/metric/context";
import {
  prerenderHref,
  speculationRulesJson,
} from "@/lib/metric/prerender-href";
import { HIDDEN_PAGE_STUB_SCRIPT } from "@/lib/metric/stub-hidden";
import { WAS_DISCARDED_STUB_SCRIPT } from "@/lib/metric/stub-was-discarded";

interface ProviderProps {
  metric: MetricSlug;
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
  children: ReactNode;
}

function Provider({ metric, flags, defaults, children }: ProviderProps) {
  return (
    <MetricContext
      value={{
        state: { flags, defaults, metric },
        actions: {},
        meta: {},
      }}
    >
      {children}
    </MetricContext>
  );
}

function Toolbar({ children }: { children?: ReactNode }) {
  const {
    state: { metric },
  } = useMetric();

  return (
    <MetricToolbar currentPath={`/metric/${metric}`}>{children}</MetricToolbar>
  );
}

function Main({ children }: { children: ReactNode }) {
  const {
    state: { flags },
  } = useMetric();
  const htmlHidden = Boolean(flags.hidden || flags.invisible);

  return (
    <main className="metric-shell" {...(htmlHidden ? { hidden: true } : {})}>
      {children}
    </main>
  );
}

function Assets() {
  const {
    state: { flags },
  } = useMetric();
  const renderBlocking =
    typeof flags.renderBlocking === "number" ? flags.renderBlocking : 0;
  const delayDCL = typeof flags.delayDCL === "number" ? flags.delayDCL : 0;
  const delayLoad = typeof flags.delayLoad === "number" ? flags.delayLoad : 0;

  return (
    <>
      {renderBlocking > 0 ? (
        <link
          href={`/public/metric/styles.css?delay=${renderBlocking}`}
          rel="stylesheet"
        />
      ) : null}
      {flags.hidden ? (
        <script dangerouslySetInnerHTML={{ __html: HIDDEN_PAGE_STUB_SCRIPT }} />
      ) : null}
      {flags.wasDiscarded ? (
        <script
          dangerouslySetInnerHTML={{ __html: WAS_DISCARDED_STUB_SCRIPT }}
        />
      ) : null}
      {delayDCL > 0 ? (
        <script src={`/public/metric/defer.js?delay=${delayDCL}`} defer />
      ) : null}
      {delayLoad > 0 ? (
        <script src={`/public/metric/async.js?delay=${delayLoad}`} async />
      ) : null}
    </>
  );
}

function Chrome() {
  const {
    state: { flags, defaults, metric },
  } = useMetric();
  const href = prerenderHref(metric, flags, defaults);

  return (
    <>
      {flags.prerender ? (
        <p>
          <a href={href}>Prerender link</a>
        </p>
      ) : null}
      {flags.prerender ? (
        <script
          dangerouslySetInnerHTML={{ __html: speculationRulesJson(href) }}
          type="speculationrules"
        />
      ) : null}
    </>
  );
}

export const Metric = {
  Assets,
  Chrome,
  Main,
  Provider,
  Toolbar,
};

export { useMetric, useMetricFlags } from "@/app/components/metric/context";
