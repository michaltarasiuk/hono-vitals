import { createContext, use, type ReactNode } from "react";

import type { MetricName } from "@/lib/collect/schema";
import type { FlagValue } from "@/lib/metric/flags/serialize";

import { Toolbar as LayoutToolbar } from "@/app/components/layout/toolbar";
import {
  prerenderHref,
  speculationRulesJson,
} from "@/lib/metric/prerender-href";
import { HIDDEN_PAGE_STUB_SCRIPT } from "@/lib/metric/stub-hidden";
import { WAS_DISCARDED_STUB_SCRIPT } from "@/lib/metric/stub-was-discarded";

const MetricContext = createContext<{
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
  metric: MetricName;
} | null>(null);

function useMetric() {
  const value = use(MetricContext);
  if (!value) {
    throw new Error("useMetric must be used within Metric.Provider");
  }
  return value;
}

interface ProviderProps {
  metric: MetricName;
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
  children: ReactNode;
}

function Provider({ metric, flags, defaults, children }: ProviderProps) {
  return (
    <MetricContext value={{ flags, defaults, metric }}>
      {children}
    </MetricContext>
  );
}

function Toolbar({ children }: { children?: ReactNode }) {
  const { metric } = useMetric();
  const currentPath = `/metric/${metric.toLowerCase()}`;

  return (
    <LayoutToolbar.Root>
      <LayoutToolbar.Nav currentPath={currentPath} />
      {children ? (
        <LayoutToolbar.Actions>{children}</LayoutToolbar.Actions>
      ) : null}
    </LayoutToolbar.Root>
  );
}

function Main({ children }: { children: ReactNode }) {
  const { flags } = useMetric();
  const htmlHidden = Boolean(flags.hidden || flags.invisible);

  return (
    <main className="metric-shell" {...(htmlHidden ? { hidden: true } : {})}>
      {children}
    </main>
  );
}

function Assets() {
  const { flags } = useMetric();
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
  const { flags, defaults, metric } = useMetric();
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
