import { Drawer } from "@/app/components/ui/drawer/drawer";
import { ROUTES } from "@/lib/shared/routes";

// Stable id so island hydration matches full-page SSR (Honox useId path differs).
const NAV_MOBILE_TRIGGER_ID = "nav-mobile-trigger";

interface NavMobileProps {
  currentPath: string;
}

export function NavMobile({ currentPath }: NavMobileProps) {
  const current = ROUTES.find(({ href }) => href === currentPath) ?? ROUTES[0];

  return (
    <div className="NavMobile">
      <Drawer.Root triggerId={NAV_MOBILE_TRIGGER_ID}>
        <Drawer.Trigger id={NAV_MOBILE_TRIGGER_ID} className="NavMobileTrigger">
          <span className="NavMobileLabel">{current.label}</span>
          <ChevronIcon />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Handle />
              <Drawer.Content>
                <Drawer.Title>Go to</Drawer.Title>
                <nav className="NavMobileList">
                  {ROUTES.map(({ href, label }) => {
                    const active = currentPath === href;
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
  );
}

function ChevronIcon() {
  return (
    <svg
      className="NavMobileChevron"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      focusable="false"
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
      className="NavMobileLinkCheck"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      focusable="false"
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
