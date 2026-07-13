import { METRIC_NAV } from "@/lib/metric/nav";

interface NavProps {
  currentPath: string;
}

export function Nav({ currentPath }: NavProps) {
  return (
    <nav className="Nav">
      {METRIC_NAV.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={
            currentPath === href ? "NavLink NavLinkActive" : "NavLink"
          }
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
