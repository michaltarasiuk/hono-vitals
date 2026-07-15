import type { ReactNode } from "react";

import { Nav } from "@/app/components/layout/nav";

function Root({ children }: { children: ReactNode }) {
  return <header className="Toolbar">{children}</header>;
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="ToolbarActions">{children}</div>;
}

export const Toolbar = {
  Actions,
  Nav,
  Root,
};
