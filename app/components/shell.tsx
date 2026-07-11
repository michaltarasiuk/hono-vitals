import { createContext, use, type ReactNode } from "react";

import type { FlagValue } from "@/utils/metric/flags/serialize";
import type { MetricSlug } from "@/utils/metric/metrics";

import { MetricToolbar } from "@/app/components/toolbar";
import FlagsEditor from "@/app/islands/flags-editor";
import {
  prerenderHref,
  speculationRulesJson,
} from "@/utils/metric/prerender-href";
import { HIDDEN_PAGE_STUB_SCRIPT } from "@/utils/metric/stub-hidden";
import { WAS_DISCARDED_STUB_SCRIPT } from "@/utils/metric/stub-was-discarded";

interface MetricFlagsContextValue {
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
}

const MetricFlagsContext = createContext<MetricFlagsContextValue | null>(null);

export function useMetricFlags() {
  const value = use(MetricFlagsContext);
  if (!value) {
    throw new Error("useMetricFlags must be used within MetricShell");
  }
  return value;
}

interface MetricShellProps {
  metric: MetricSlug;
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
  children: ReactNode;
}

export function MetricShell({
  metric,
  flags,
  defaults,
  children,
}: MetricShellProps) {
  const renderBlocking =
    typeof flags.renderBlocking === "number" ? flags.renderBlocking : 0;
  const delayDCL = typeof flags.delayDCL === "number" ? flags.delayDCL : 0;
  const delayLoad = typeof flags.delayLoad === "number" ? flags.delayLoad : 0;
  const htmlHidden = Boolean(flags.hidden || flags.invisible);

  return (
    <MetricFlagsContext value={{ flags, defaults }}>
      <MetricToolbar currentPath={`/metric/${metric}`}>
        <FlagsEditor flags={flags} defaults={defaults} />
      </MetricToolbar>
      <main className="metric-shell" {...(htmlHidden ? { hidden: true } : {})}>
        {renderBlocking > 0 ? (
          <link
            href={`/public/metric/styles.css?delay=${renderBlocking}`}
            rel="stylesheet"
          />
        ) : null}
        {flags.hidden ? (
          <script
            dangerouslySetInnerHTML={{ __html: HIDDEN_PAGE_STUB_SCRIPT }}
          />
        ) : null}
        {flags.wasDiscarded ? (
          <script
            dangerouslySetInnerHTML={{ __html: WAS_DISCARDED_STUB_SCRIPT }}
          />
        ) : null}
        {children}
        {delayDCL > 0 ? (
          <script src={`/public/metric/defer.js?delay=${delayDCL}`} defer />
        ) : null}
        {delayLoad > 0 ? (
          <script src={`/public/metric/async.js?delay=${delayLoad}`} async />
        ) : null}
      </main>
    </MetricFlagsContext>
  );
}

interface MetricChromeProps {
  metric: MetricSlug;
}

export function MetricChrome({ metric }: MetricChromeProps) {
  const { flags, defaults } = useMetricFlags();
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
