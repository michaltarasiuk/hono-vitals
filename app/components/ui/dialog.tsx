import {Dialog as BaseDialog} from '@base-ui/react/dialog';

import {cn} from '@/lib/cn';

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
    <BaseDialog.Backdrop className={cn('Backdrop', className)} {...props} />
  );
}

function Popup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Popup className={cn('Popup', className)} {...props}>
      {children}
    </BaseDialog.Popup>
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
}: React.ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title className={cn('Title', className)} {...props}>
      {children}
    </BaseDialog.Title>
  );
}

function Description({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description className={cn('Description', className)} {...props}>
      {children}
    </BaseDialog.Description>
  );
}

function Body({children, className, ...props}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('Body', className)} {...props}>
      {children}
    </div>
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
}: React.ComponentProps<typeof BaseDialog.Close>) {
  return <BaseDialog.Close {...props}>{children}</BaseDialog.Close>;
}

export const Dialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Header,
  Title,
  Description,
  Body,
  Actions,
  Close,
};
