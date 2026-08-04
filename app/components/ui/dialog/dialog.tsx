import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { cx } from "@/lib/cx";

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
    <BaseDialog.Backdrop className={cx("Backdrop", className)} {...props} />
  );
}

function Popup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Popup className={cx("Popup", className)} {...props}>
      {children}
    </BaseDialog.Popup>
  );
}

function Header({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cx("Header", className)} {...props}>
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
    <BaseDialog.Title className={cx("Title", className)} {...props}>
      {children}
    </BaseDialog.Title>
  );
}

function Description({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description className={cx("Description", className)} {...props}>
      {children}
    </BaseDialog.Description>
  );
}

function Body({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cx("Body", className)} {...props}>
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
    <div className={cx("Actions", className)} {...props}>
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
  Body,
  Close,
  Description,
  Header,
  Popup,
  Portal,
  Root,
  Title,
  Trigger,
};
