import {Toast as BaseToast} from '@base-ui/react/toast';

import {cn} from '@/lib/utils/cn';

function Provider({
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Provider>) {
  return <BaseToast.Provider {...props}>{children}</BaseToast.Provider>;
}

function Portal({
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Portal>) {
  return <BaseToast.Portal {...props}>{children}</BaseToast.Portal>;
}

function Viewport({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Viewport>) {
  return (
    <BaseToast.Viewport className={cn('ToastViewport', className)} {...props}>
      {children}
    </BaseToast.Viewport>
  );
}

function Root({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Root>) {
  return (
    <BaseToast.Root className={cn('Toast', className)} {...props}>
      {children}
    </BaseToast.Root>
  );
}

function Content({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Content>) {
  return (
    <BaseToast.Content className={cn('ToastContent', className)} {...props}>
      {children}
    </BaseToast.Content>
  );
}

function Title({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Title>) {
  return (
    <BaseToast.Title className={cn('ToastTitle', className)} {...props}>
      {children}
    </BaseToast.Title>
  );
}

function Description({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Description>) {
  return (
    <BaseToast.Description
      className={cn('ToastDescription', className)}
      {...props}
    >
      {children}
    </BaseToast.Description>
  );
}

function Close({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Close>) {
  return (
    <BaseToast.Close className={cn('ToastClose', className)} {...props}>
      {children}
    </BaseToast.Close>
  );
}

function Action({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseToast.Action>) {
  return (
    <BaseToast.Action className={cn('ToastAction', className)} {...props}>
      {children}
    </BaseToast.Action>
  );
}

function List() {
  const {toasts} = BaseToast.useToastManager();

  return toasts.map((t) => (
    <Root key={t.id} toast={t}>
      <Content>
        <div className="ToastText">
          <Title />
          <Description />
        </div>
        <Close>Dismiss</Close>
      </Content>
    </Root>
  ));
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
};
