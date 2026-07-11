import type { ReactNode } from "react";

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
    <>
      <MetricToolbar currentPath={`/metric/${metric}`}>
        <FlagsEditor flags={flags} defaults={defaults} />
      </MetricToolbar>
      <main className="metric-test" {...(htmlHidden ? { hidden: true } : {})}>
        {renderBlocking > 0 ? (
          <link
            href={`/static/metric/styles.css?delay=${renderBlocking}`}
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
          <script src={`/static/metric/defer.js?delay=${delayDCL}`} defer />
        ) : null}
        {delayLoad > 0 ? (
          <script src={`/static/metric/async.js?delay=${delayLoad}`} async />
        ) : null}
      </main>
    </>
  );
}

interface MetricChromeProps {
  metric: MetricSlug;
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
}

export function MetricChrome({ metric, flags, defaults }: MetricChromeProps) {
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
