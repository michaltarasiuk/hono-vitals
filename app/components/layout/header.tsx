import {Nav} from '@/app/components/layout/$nav';

function Root({children}: {children: React.ReactNode}) {
  return (
    <header className="Toolbar">
      <div className="ToolbarInner">{children}</div>
    </header>
  );
}

function Actions({children}: {children: React.ReactNode}) {
  return <div className="ToolbarActions">{children}</div>;
}

function Label({full, short}: {full: React.ReactNode; short: React.ReactNode}) {
  return (
    <>
      <span className="ToolbarLabel ToolbarLabel--full">{full}</span>
      <span className="ToolbarLabel ToolbarLabel--short">{short}</span>
    </>
  );
}

export const Header = {
  Root,
  Nav,
  Actions,
  Label,
};
