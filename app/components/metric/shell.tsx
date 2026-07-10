import type { ReactNode } from "react";

import type { FlagValue } from "@/utils/metric/flags/serialize";

import FlagsEditor from "@/app/islands/flags-editor";
import {
  prerenderHref,
  speculationRulesJson,
} from "@/utils/metric/prerender-href";
import { HIDDEN_PAGE_STUB_SCRIPT } from "@/utils/metric/stub-hidden";
import { WAS_DISCARDED_STUB_SCRIPT } from "@/utils/metric/stub-was-discarded";

interface MetricShellProps {
  children: ReactNode;
  defaults: Record<string, FlagValue>;
  flags: Record<string, FlagValue>;
}

export function MetricShell({
  children,
  defaults,
  flags,
}: MetricShellProps) {
  const renderBlocking =
    typeof flags.renderBlocking === "number" ? flags.renderBlocking : 0;
  const delayDCL = typeof flags.delayDCL === "number" ? flags.delayDCL : 0;
  const delayLoad = typeof flags.delayLoad === "number" ? flags.delayLoad : 0;
  const htmlHidden = Boolean(flags.hidden || flags.invisible);

  return (
    <>
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
          <script defer src={`/static/metric/defer.js?delay=${delayDCL}`} />
        ) : null}
        {delayLoad > 0 ? (
          <script async src={`/static/metric/async.js?delay=${delayLoad}`} />
        ) : null}
      </main>
      <div className="FlagsEditorFab">
        <FlagsEditor defaults={defaults} flags={flags} />
      </div>
    </>
  );
}

interface MetricChromeProps {
  defaults: Record<string, FlagValue>;
  flags: Record<string, FlagValue>;
  metric: string;
}

export function MetricChrome({ defaults, flags, metric }: MetricChromeProps) {
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
