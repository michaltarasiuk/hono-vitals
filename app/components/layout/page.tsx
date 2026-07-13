import type { ReactNode } from "react";

import { MetricToolbar } from "@/app/components/layout/toolbar";

function Toolbar({
  currentPath,
  children,
}: {
  currentPath: string;
  children?: ReactNode;
}) {
  return <MetricToolbar currentPath={currentPath}>{children}</MetricToolbar>;
}

function Main({ children }: { children: ReactNode }) {
  return <main className="metric-shell">{children}</main>;
}

export const Page = {
  Main,
  Toolbar,
};
