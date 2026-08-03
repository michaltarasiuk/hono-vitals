import { isActiveHref, ROUTES } from "@/lib/routes";
import { NavMobile } from "@/app/islands/nav-mobile";

interface NavProps {
  currentPath: string;
}

export function Nav({ currentPath }: NavProps) {
  return (
    <>
      <nav className="NavDesktop">
        {ROUTES.map(({ href, label }) => {
          const active = isActiveHref(href, currentPath);
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
