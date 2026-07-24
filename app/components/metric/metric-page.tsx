import { createContext, use, type ReactNode } from "react";

import type { MetricName } from "@/lib/collect/schema";
import type { Flags } from "@/lib/metric/flags/schema";

import { Toolbar as LayoutToolbar } from "@/app/components/layout/toolbar";
import { Text } from "@/app/components/ui/text/text";
import { isDefined } from "@/lib/is-defined";
import { metricHref } from "@/lib/metric/metric-href";
import { HIDDEN_STUB_SCRIPT } from "@/lib/metric/stub-hidden";
import { WAS_DISCARDED_STUB_SCRIPT } from "@/lib/metric/stub-was-discarded";

interface MetricPageContextValue {
  flags: Flags;
  defaults: Flags;
  metric: MetricName;
}

const MetricPageContext = createContext<MetricPageContextValue | null>(null);

function useMetricPage() {
  const value = use(MetricPageContext);
  if (!isDefined(value)) {
    throw new Error("useMetricPage must be used within MetricPage.Provider");
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
    <MetricPageContext value={{ flags, defaults, metric }}>
      {children}
    </MetricPageContext>
  );
}

function Toolbar({ children }: { children?: ReactNode }) {
  const { metric } = useMetricPage();
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
  const { flags } = useMetricPage();
  const htmlHidden = Boolean(flags.stubHidden || flags.htmlHidden);

  return (
    <main className="MetricMain" {...(htmlHidden ? { hidden: true } : {})}>
      {children}
    </main>
  );
}

function Content({ children }: { children: ReactNode }) {
  return <div className="MetricContent">{children}</div>;
}

function DelayedScripts() {
  const { flags } = useMetricPage();
  const renderBlocking =
    typeof flags.renderBlocking === "number" ? flags.renderBlocking : 0;
  const delayDomContentLoaded =
    typeof flags.delayDomContentLoaded === "number"
      ? flags.delayDomContentLoaded
      : 0;
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
      {flags.stubHidden ? (
        <script dangerouslySetInnerHTML={{ __html: HIDDEN_STUB_SCRIPT }} />
      ) : null}
      {flags.wasDiscarded ? (
        <script
          dangerouslySetInnerHTML={{ __html: WAS_DISCARDED_STUB_SCRIPT }}
        />
      ) : null}
      {delayDomContentLoaded > 0 ? (
        <script
          src={`/public/metric/delay-dcl.js?delay=${delayDomContentLoaded}`}
          defer
        />
      ) : null}
      {delayLoad > 0 ? (
        <script
          src={`/public/metric/delay-load.js?delay=${delayLoad}`}
          async
        />
      ) : null}
    </>
  );
}

function PrerenderHints() {
  const { flags, defaults, metric } = useMetricPage();
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [{ urls: [href] }],
            }),
          }}
          type="speculationrules"
        />
      ) : null}
    </>
  );
}

export const MetricPage = {
  DelayedScripts,
  PrerenderHints,
  Content,
  Main,
  Provider,
  Toolbar,
};
