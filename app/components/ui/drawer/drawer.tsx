import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

function Root({
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Root>) {
  return <BaseDrawer.Root {...props}>{children}</BaseDrawer.Root>;
}

function Trigger({
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Trigger>) {
  return <BaseDrawer.Trigger {...props}>{children}</BaseDrawer.Trigger>;
}

function Portal({
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Portal>) {
  return <BaseDrawer.Portal {...props}>{children}</BaseDrawer.Portal>;
}

function Backdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Backdrop>) {
  return (
    <BaseDrawer.Backdrop
      className={className ? `DrawerBackdrop ${className}` : "DrawerBackdrop"}
      {...props}
    />
  );
}

function Viewport({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Viewport>) {
  return (
    <BaseDrawer.Viewport
      className={className ? `DrawerViewport ${className}` : "DrawerViewport"}
      {...props}
    >
      {children}
    </BaseDrawer.Viewport>
  );
}

function Popup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Popup>) {
  return (
    <BaseDrawer.Popup
      className={className ? `DrawerPopup ${className}` : "DrawerPopup"}
      {...props}
    >
      {children}
    </BaseDrawer.Popup>
  );
}

function Content({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Content>) {
  return (
    <BaseDrawer.Content
      className={className ? `DrawerContent ${className}` : "DrawerContent"}
      {...props}
    >
      {children}
    </BaseDrawer.Content>
  );
}

function Title({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title
      className={className ? `DrawerTitle ${className}` : "DrawerTitle"}
      {...props}
    >
      {children}
    </BaseDrawer.Title>
  );
}

function Close({
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Close>) {
  return <BaseDrawer.Close {...props}>{children}</BaseDrawer.Close>;
}

function Handle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={className ? `DrawerHandle ${className}` : "DrawerHandle"}
      {...props}
    />
  );
}

export const Drawer = {
  Backdrop,
  Close,
  Content,
  Handle,
  Popup,
  Portal,
  Root,
  Title,
  Trigger,
  Viewport,
};
