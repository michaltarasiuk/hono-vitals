import { createContext, use, type ReactNode } from "react";

import type { MetricName } from "@/lib/collect/schema";
import type { Flags } from "@/lib/metric/flags/serialize";

import { Toolbar as LayoutToolbar } from "@/app/components/layout/toolbar";
import { Text } from "@/app/components/ui/text/text";
import { isDefined } from "@/lib/is-defined";
import {
  metricHref,
  prerenderSpeculationRules,
} from "@/lib/metric/metric-href";
import { HIDDEN_PAGE_STUB_SCRIPT } from "@/lib/metric/stub-hidden";
import { WAS_DISCARDED_STUB_SCRIPT } from "@/lib/metric/stub-was-discarded";

interface MetricContextValue {
  flags: Flags;
  defaults: Flags;
  metric: MetricName;
}

const MetricContext = createContext<MetricContextValue | null>(null);

function useMetric() {
  const value = use(MetricContext);
  if (!isDefined(value)) {
    throw new Error("useMetric must be used within Metric.Provider");
  }
  return value;
}

interface ProviderProps {
  metric: MetricName;
  flags: Flags;
  defaults: Flags;
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
    <main className="MetricMain" {...(htmlHidden ? { hidden: true } : {})}>
      {children}
    </main>
  );
}

function Content({ children }: { children: ReactNode }) {
  return <div className="MetricContent">{children}</div>;
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
          precedence="default"
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

function Prerender() {
  const { flags, defaults, metric } = useMetric();
  const href = metricHref(metric, flags, defaults);

  return (
    <>
      {flags.prerender ? (
        <Text>
          <a href={href}>Prerender link</a>
        </Text>
      ) : null}
      {flags.prerender ? (
        <script
          dangerouslySetInnerHTML={{ __html: prerenderSpeculationRules(href) }}
          type="speculationrules"
        />
      ) : null}
    </>
  );
}

export const Metric = {
  Assets,
  Prerender,
  Content,
  Main,
  Provider,
  Toolbar,
};
