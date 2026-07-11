import { Dialog as BaseDialog } from "@base-ui/react/dialog";

function Root({
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root {...props}>{children}</BaseDialog.Root>;
}

function Trigger({
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger {...props}>{children}</BaseDialog.Trigger>;
}

function Portal({
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal {...props}>{children}</BaseDialog.Portal>;
}

function Backdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Backdrop>) {
  return (
    <BaseDialog.Backdrop
      className={className ? `Backdrop ${className}` : "Backdrop"}
      {...props}
    />
  );
}

function Popup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Popup
      className={className ? `Popup ${className}` : "Popup"}
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  );
}

function Intro({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={className ? `Intro ${className}` : "Intro"} {...props}>
      {children}
    </div>
  );
}

function Title({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      className={className ? `Title ${className}` : "Title"}
      {...props}
    >
      {children}
    </BaseDialog.Title>
  );
}

function List({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={className ? `List ${className}` : "List"} {...props}>
      {children}
    </div>
  );
}

function Actions({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={className ? `Actions ${className}` : "Actions"} {...props}>
      {children}
    </div>
  );
}

function Close({
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Close>) {
  return <BaseDialog.Close {...props}>{children}</BaseDialog.Close>;
}

export const Dialog = {
  Actions,
  Backdrop,
  Close,
  Intro,
  List,
  Popup,
  Portal,
  Root,
  Title,
  Trigger,
};
