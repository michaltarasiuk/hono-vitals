import { NavMobile } from "@/app/islands/nav-mobile";
import { ROUTES } from "@/lib/shared/routes";

interface NavProps {
  currentPath: string;
}

export function Nav({ currentPath }: NavProps) {
  return (
    <>
      <nav className="NavDesktop">
        {ROUTES.map(({ href, label }) => {
          const active = currentPath === href;
          return (
            <a
              key={href}
              href={href}
              className={active ? "NavLink NavLinkActive" : "NavLink"}
            >
              {label}
            </a>
          );
        })}
      </nav>
      <NavMobile currentPath={currentPath} />
    </>
  );
}
