import {Toast as BaseToast} from '@base-ui/react/toast'

import {cx} from '@/lib/cx'

function Provider({
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Provider>) {
  return <BaseToast.Provider {...props}>{children}</BaseToast.Provider>
}

function Portal({
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Portal>) {
  return <BaseToast.Portal {...props}>{children}</BaseToast.Portal>
}

function Viewport({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Viewport>) {
  return (
    <BaseToast.Viewport className={cx('ToastViewport', className)} {...props}>
      {children}
    </BaseToast.Viewport>
  )
}

function Root({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Root>) {
  return (
    <BaseToast.Root className={cx('Toast', className)} {...props}>
      {children}
    </BaseToast.Root>
  )
}

function Content({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Content>) {
  return (
    <BaseToast.Content className={cx('ToastContent', className)} {...props}>
      {children}
    </BaseToast.Content>
  )
}

function Title({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Title>) {
  return (
    <BaseToast.Title className={cx('ToastTitle', className)} {...props}>
      {children}
    </BaseToast.Title>
  )
}

function Description({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Description>) {
  return (
    <BaseToast.Description
      className={cx('ToastDescription', className)}
      {...props}
    >
      {children}
    </BaseToast.Description>
  )
}

function Close({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Close>) {
  return (
    <BaseToast.Close className={cx('ToastClose', className)} {...props}>
      {children}
    </BaseToast.Close>
  )
}

function Action({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Action>) {
  return (
    <BaseToast.Action className={cx('ToastAction', className)} {...props}>
      {children}
    </BaseToast.Action>
  )
}

function List() {
  const {toasts} = BaseToast.useToastManager()

  return toasts.map((toast) => (
    <Root key={toast.id} toast={toast}>
      <Content>
        <div className="ToastText">
          <Title />
          <Description />
        </div>
        <Close>Dismiss</Close>
      </Content>
    </Root>
  ))
}

export const Toast = {
  Action,
  Close,
  Content,
  Description,
  List,
  Portal,
  Provider,
  Root,
  Title,
  Viewport,
  useToastManager: BaseToast.useToastManager,
}
