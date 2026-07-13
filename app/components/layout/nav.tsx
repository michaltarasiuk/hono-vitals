import { METRIC_NAV } from "@/lib/metric/nav";

interface MetricNavProps {
  currentPath: string;
}

export function MetricNav({ currentPath }: MetricNavProps) {
  return (
    <nav className="MetricNav">
      {METRIC_NAV.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={
            currentPath === href
              ? "MetricNavLink MetricNavLinkActive"
              : "MetricNavLink"
          }
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
