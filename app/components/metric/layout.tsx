import {createContext, use} from 'react';

import {Header} from '@/app/components/header';
import {Text} from '@/app/components/ui/text';
import {isDefined} from '@/lib/is-defined';
import {joinPath} from '@/lib/join-path';
import {metricHref} from '@/lib/metric/href';
import {metricSlug} from '@/lib/metric/slug';
import {HIDDEN_STUB_SCRIPT} from '@/lib/metric/stub-hidden';
import {WAS_DISCARDED_STUB_SCRIPT} from '@/lib/metric/stub-was-discarded';

import type {MetricName} from '@/lib/collect/metric-schema';
import type {Flags} from '@/lib/metric/flags/schema';

interface MetricLayoutContextValue {
  metricName: MetricName;
  flags: Flags;
  defaults: Flags;
}

const MetricLayoutContext = createContext<MetricLayoutContextValue | null>(
  null,
);

function useMetricLayout() {
  const value = use(MetricLayoutContext);
  if (!isDefined(value)) {
    throw new Error(
      'useMetricLayout must be used within MetricLayout.Provider',
    );
  }
  return value;
}

interface ProviderProps {
  metricName: MetricName;
  flags: Flags;
  defaults: Flags;
  children: React.ReactNode;
}

function Provider({metricName, flags, defaults, children}: ProviderProps) {
  return (
    <MetricLayoutContext value={{flags, defaults, metricName}}>
      {children}
    </MetricLayoutContext>
  );
}

function Toolbar({children}: {children: React.ReactNode}) {
  const {metricName} = useMetricLayout();
  const currentPath = joinPath('metric', metricSlug(metricName));

  return (
    <Header.Root>
      <Header.Nav currentPath={currentPath} />
      {children ? <Header.Actions>{children}</Header.Actions> : null}
    </Header.Root>
  );
}

function Main({children}: {children: React.ReactNode}) {
  const {flags} = useMetricLayout();
  const hidden = Boolean(flags.stubHidden ?? flags.htmlHidden) || undefined;

  return (
    <main className="MetricMain" hidden={hidden}>
      {children}
    </main>
  );
}

function Content({children}: {children: React.ReactNode}) {
  return <div className="MetricContent">{children}</div>;
}

function numericFlag(value: unknown) {
  return typeof value === 'number' ? value : 0;
}

function DelayedScripts() {
  const {flags} = useMetricLayout();
  const renderBlocking = numericFlag(flags.renderBlocking);
  const delayDomContentLoaded = numericFlag(flags.delayDomContentLoaded);
  const delayLoad = numericFlag(flags.delayLoad);

  return (
    <>
      {renderBlocking > 0 && (
        <link
          rel="stylesheet"
          href={`/public/metric/render-blocking.css?delay=${renderBlocking}`}
          precedence="default"
        />
      )}
      {flags.stubHidden && (
        <script dangerouslySetInnerHTML={{__html: HIDDEN_STUB_SCRIPT}} />
      )}
      {flags.wasDiscarded && (
        <script dangerouslySetInnerHTML={{__html: WAS_DISCARDED_STUB_SCRIPT}} />
      )}
      {delayDomContentLoaded > 0 && (
        <script
          src={`/public/metric/delay-dcl.js?delay=${delayDomContentLoaded}`}
          defer
        />
      )}
      {delayLoad > 0 && (
        <script src={`/public/metric/delay-load.js?delay=${delayLoad}`} async />
      )}
    </>
  );
}

function PrerenderHints() {
  const {metricName, flags, defaults} = useMetricLayout();
  if (!flags.prerender) {
    return null;
  }

  const href = metricHref(metricName, flags, defaults);

  return (
    <>
      <Text>
        <a href={href}>Prerender link</a>
      </Text>
      <script
        type="speculationrules"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({prerender: [{urls: [href]}]}),
        }}
      />
    </>
  );
}

export const MetricLayout = {
  Provider,
  Toolbar,
  Main,
  DelayedScripts,
  Content,
  PrerenderHints,
};
