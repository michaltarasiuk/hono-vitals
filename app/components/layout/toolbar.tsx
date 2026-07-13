import type { ReactNode } from "react";

import { Nav } from "@/app/components/layout/nav";

function Root({ children }: { children: ReactNode }) {
  return <header className="Toolbar">{children}</header>;
}

function NavSlot({ currentPath }: { currentPath: string }) {
  return <Nav currentPath={currentPath} />;
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="ToolbarActions">{children}</div>;
}

export const Toolbar = {
  Actions,
  Nav: NavSlot,
  Root,
};
