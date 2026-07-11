import type { ReactNode } from "react";

import { MetricNav } from "@/app/components/metric/nav";

interface MetricToolbarProps {
  children?: ReactNode;
  currentPath: string;
}

export function MetricToolbar({ children, currentPath }: MetricToolbarProps) {
  return (
    <header className="MetricToolbar">
      <MetricNav currentPath={currentPath} />
      <div className="MetricToolbarActions">{children}</div>
    </header>
  );
}
