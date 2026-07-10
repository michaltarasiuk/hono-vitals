import { METRIC_NAV } from "@/utils/metric/metrics";

interface MetricNavProps {
  currentPath: string;
}

export function MetricNav({ currentPath }: MetricNavProps) {
  return (
    <nav className="MetricNav">
      {METRIC_NAV.map(({ href, label }) => (
        <a
          className={
            currentPath === href
              ? "MetricNavLink MetricNavLinkActive"
              : "MetricNavLink"
          }
          href={href}
          key={href}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
