import { ROUTES } from "@/lib/shared/routes";

interface NavProps {
  currentPath: string;
}

export function Nav({ currentPath }: NavProps) {
  return (
    <nav className="Nav">
      {ROUTES.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={currentPath === href ? "NavLink NavLinkActive" : "NavLink"}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
