import {Drawer as BaseDrawer} from '@base-ui/react/drawer'

import {cx} from '@/lib/cx'

function Root({
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Root>) {
  return <BaseDrawer.Root {...props}>{children}</BaseDrawer.Root>
}

function Trigger({
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Trigger>) {
  return <BaseDrawer.Trigger {...props}>{children}</BaseDrawer.Trigger>
}

function Portal({
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Portal>) {
  return <BaseDrawer.Portal {...props}>{children}</BaseDrawer.Portal>
}

function Backdrop({
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Backdrop>) {
  return (
    <BaseDrawer.Backdrop
      className={cx('DrawerBackdrop', className)}
      {...props}
    />
  )
}

function Viewport({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Viewport>) {
  return (
    <BaseDrawer.Viewport className={cx('DrawerViewport', className)} {...props}>
      {children}
    </BaseDrawer.Viewport>
  )
}

function Popup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Popup>) {
  return (
    <BaseDrawer.Popup className={cx('DrawerPopup', className)} {...props}>
      {children}
    </BaseDrawer.Popup>
  )
}

function Content({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Content>) {
  return (
    <BaseDrawer.Content className={cx('DrawerContent', className)} {...props}>
      {children}
    </BaseDrawer.Content>
  )
}

function Title({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Title>) {
  return (
    <BaseDrawer.Title className={cx('DrawerTitle', className)} {...props}>
      {children}
    </BaseDrawer.Title>
  )
}

function Close({
  children,
  ...props
}: React.ComponentProps<typeof BaseDrawer.Close>) {
  return <BaseDrawer.Close {...props}>{children}</BaseDrawer.Close>
}

function Grip({className, ...props}: React.ComponentProps<'div'>) {
  return <div className={cx('DrawerGrip', className)} {...props} />
}

export const Drawer = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Viewport,
  Popup,
  Grip,
  Content,
  Title,
  Close,
}
