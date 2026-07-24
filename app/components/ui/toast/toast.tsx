import { Toast as BaseToast } from "@base-ui/react/toast";

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
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Viewport>) {
  return (
    <BaseToast.Viewport
      className={className ? `ToastViewport ${className}` : "ToastViewport"}
      {...props}
    >
      {children}
    </BaseToast.Viewport>
  );
}

function Root({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Root>) {
  return (
    <BaseToast.Root
      className={className ? `Toast ${className}` : "Toast"}
      {...props}
    >
      {children}
    </BaseToast.Root>
  );
}

function Content({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Content>) {
  return (
    <BaseToast.Content
      className={className ? `ToastContent ${className}` : "ToastContent"}
      {...props}
    >
      {children}
    </BaseToast.Content>
  );
}

function Title({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Title>) {
  return (
    <BaseToast.Title
      className={className ? `ToastTitle ${className}` : "ToastTitle"}
      {...props}
    >
      {children}
    </BaseToast.Title>
  );
}

function Description({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Description>) {
  return (
    <BaseToast.Description
      className={
        className ? `ToastDescription ${className}` : "ToastDescription"
      }
      {...props}
    >
      {children}
    </BaseToast.Description>
  );
}

function Close({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Close>) {
  return (
    <BaseToast.Close
      className={className ? `ToastClose ${className}` : "ToastClose"}
      {...props}
    >
      {children}
    </BaseToast.Close>
  );
}

function Action({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseToast.Action>) {
  return (
    <BaseToast.Action
      className={className ? `ToastClose ${className}` : "ToastClose"}
      {...props}
    >
      {children}
    </BaseToast.Action>
  );
}

function List() {
  const { toasts } = BaseToast.useToastManager();

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
