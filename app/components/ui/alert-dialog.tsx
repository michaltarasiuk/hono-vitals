import {AlertDialog as BaseAlertDialog} from '@base-ui/react/alert-dialog';

import {cn} from '@/lib/cn';

function Root({
  children,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Root>) {
  return <BaseAlertDialog.Root {...props}>{children}</BaseAlertDialog.Root>;
}

function Trigger({
  children,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Trigger>) {
  return (
    <BaseAlertDialog.Trigger {...props}>{children}</BaseAlertDialog.Trigger>
  );
}

function Portal({
  children,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Portal>) {
  return <BaseAlertDialog.Portal {...props}>{children}</BaseAlertDialog.Portal>;
}

function Backdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Backdrop>) {
  return (
    <BaseAlertDialog.Backdrop
      className={cn('Backdrop', className)}
      {...props}
    />
  );
}

function Popup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) {
  return (
    <BaseAlertDialog.Popup className={cn('Popup', className)} {...props}>
      {children}
    </BaseAlertDialog.Popup>
  );
}

function Header({children, className, ...props}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('Header', className)} {...props}>
      {children}
    </div>
  );
}

function Title({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) {
  return (
    <BaseAlertDialog.Title className={cn('Title', className)} {...props}>
      {children}
    </BaseAlertDialog.Title>
  );
}

function Description({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description
      className={cn('Description', className)}
      {...props}
    >
      {children}
    </BaseAlertDialog.Description>
  );
}

function Actions({children, className, ...props}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('Actions', className)} {...props}>
      {children}
    </div>
  );
}

function Close({
  children,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Close>) {
  return <BaseAlertDialog.Close {...props}>{children}</BaseAlertDialog.Close>;
}

export const AlertDialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Header,
  Title,
  Description,
  Actions,
  Close,
};
