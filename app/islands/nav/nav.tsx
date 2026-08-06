import { Drawer } from "@/app/components/ui/drawer/drawer";
import { islandId } from "@/lib/island-id";
import { getActiveRoute, ROUTES } from "@/lib/routes";

const NAV_MOBILE_TRIGGER_ID = islandId("nav-mobile-trigger");

interface NavProps {
  currentPath: string;
}

export function Nav({ currentPath }: NavProps) {
  const activeRoute = getActiveRoute(currentPath);

  return (
    <>
      <nav className="NavDesktop">
        {ROUTES.map(({ href, label }) => {
          const active = href === currentPath;
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
      <div className="NavMobile">
        <Drawer.Root>
          <Drawer.Trigger
            id={NAV_MOBILE_TRIGGER_ID}
            className="NavMobileTrigger"
          >
            <span className="NavMobileLabel">{activeRoute.label}</span>
            <ChevronIcon />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Grip />
                <Drawer.Content>
                  <Drawer.Title>Go to</Drawer.Title>
                  <nav className="NavMobileList">
                    {ROUTES.map(({ href, label }) => {
                      const active = href === currentPath;

                      return (
                        <a
                          key={href}
                          href={href}
                          className={
                            active
                              ? "NavMobileLink NavMobileLinkActive"
                              : "NavMobileLink"
                          }
                        >
                          <span>{label}</span>
                          {active ? <CheckIcon /> : null}
                        </a>
                      );
                    })}
                  </nav>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      focusable="false"
      className="NavMobileChevron"
    >
      <path
        d="M2.5 4.25 6 7.75l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      focusable="false"
      className="NavMobileLinkCheck"
    >
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
