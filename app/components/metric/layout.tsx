import type { ReactNode } from "react";

import { MetricToolbar } from "@/app/components/toolbar";

interface MetricPageLayoutProps {
  currentPath: string;
  children: ReactNode;
  toolbarActions?: ReactNode;
}

export function MetricPageLayout({
  currentPath,
  children,
  toolbarActions,
}: MetricPageLayoutProps) {
  return (
    <>
      <MetricToolbar currentPath={currentPath}>{toolbarActions}</MetricToolbar>
      <main className="metric-shell">{children}</main>
    </>
  );
}
