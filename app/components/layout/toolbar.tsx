import type { ReactNode } from "react";

import { Nav } from "@/app/islands/nav/nav";

function Root({ children }: { children: ReactNode }) {
  return (
    <header className="Toolbar">
      <div className="ToolbarInner">{children}</div>
    </header>
  );
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="ToolbarActions">{children}</div>;
}

export const Toolbar = {
  Actions,
  Nav,
  Root,
};
