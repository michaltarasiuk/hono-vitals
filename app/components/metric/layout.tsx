import {createContext, use} from 'react';

import {Header} from '@/app/components/layout/header';
import {Text} from '@/app/components/ui/text';
import {metricHref} from '@/lib/metric/href';
import {HIDDEN_STUB_SCRIPT} from '@/lib/metric/stubs/hidden-visibility';
import {WAS_DISCARDED_STUB_SCRIPT} from '@/lib/metric/stubs/was-discarded';
import {isDefined} from '@/lib/utils/is-defined';

import type {Flags} from '@/lib/metric/flags/schema';
import type {MetricName} from '@/lib/metric/schema';

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
  const currentPath = metricHref(metricName);

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

function coerceNonNegativeNumber(value: unknown) {
  return typeof value === 'number' ? value : 0;
}

function DelayedScripts() {
  const {flags} = useMetricLayout();
  const renderBlocking = coerceNonNegativeNumber(flags.renderBlocking);
  const delayDomContentLoaded = coerceNonNegativeNumber(
    flags.delayDomContentLoaded,
  );
  const delayLoad = coerceNonNegativeNumber(flags.delayLoad);

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
