import type { ReactNode } from "react";

import type { FlagValue } from "@/lib/metric/flags/serialize";
import type { MetricSlug } from "@/lib/metric/nav";

import { Toolbar as LayoutToolbar } from "@/app/components/layout/toolbar";
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
    <MetricContext value={{ flags, defaults, metric }}>
      {children}
    </MetricContext>
  );
}

function Toolbar({ children }: { children?: ReactNode }) {
  const { metric } = useMetric();
  const currentPath = `/metric/${metric}`;

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
          href={`/static/metric/styles.css?delay=${renderBlocking}`}
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
        <script src={`/static/metric/defer.js?delay=${delayDCL}`} defer />
      ) : null}
      {delayLoad > 0 ? (
        <script src={`/static/metric/async.js?delay=${delayLoad}`} async />
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
