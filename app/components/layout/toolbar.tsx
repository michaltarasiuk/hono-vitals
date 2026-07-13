import type { ReactNode } from "react";

import { Nav } from "@/app/components/layout/nav";

interface ToolbarProps {
  currentPath: string;
  children?: ReactNode;
}

export function Toolbar({ currentPath, children }: ToolbarProps) {
  return (
    <header className="Toolbar">
      <Nav currentPath={currentPath} />
      <div className="ToolbarActions">{children}</div>
    </header>
  );
}
