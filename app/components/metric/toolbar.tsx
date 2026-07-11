import type { ReactNode } from "react";

import { MetricNav } from "@/app/components/metric/nav";

interface MetricToolbarProps {
  currentPath: string;
  children?: ReactNode;
}

export function MetricToolbar({ currentPath, children }: MetricToolbarProps) {
  return (
    <header className="MetricToolbar">
      <MetricNav currentPath={currentPath} />
      <div className="MetricToolbarActions">{children}</div>
    </header>
  );
}
