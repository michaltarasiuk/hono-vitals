import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

function Root({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) {
  return (
    <BaseNumberField.Root
      className={className ? `NumberField ${className}` : "NumberField"}
      {...props}
    >
      {children}
    </BaseNumberField.Root>
  );
}

function ScrubArea({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubArea>) {
  return (
    <BaseNumberField.ScrubArea
      className={
        className ? `NumberFieldScrubArea ${className}` : "NumberFieldScrubArea"
      }
      {...props}
    >
      {children}
    </BaseNumberField.ScrubArea>
  );
}

function ScrubAreaCursor({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubAreaCursor>) {
  return (
    <BaseNumberField.ScrubAreaCursor
      className={
        className
          ? `NumberFieldScrubAreaCursor ${className}`
          : "NumberFieldScrubAreaCursor"
      }
      {...props}
    />
  );
}

function Label({
  children,
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={className ? `NumberFieldLabel ${className}` : "NumberFieldLabel"}
      {...props}
    >
      {children}
    </label>
  );
}

function Group({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Group>) {
  return (
    <BaseNumberField.Group
      className={className ? `NumberFieldGroup ${className}` : "NumberFieldGroup"}
      {...props}
    >
      {children}
    </BaseNumberField.Group>
  );
}

function Input({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Input>) {
  return (
    <BaseNumberField.Input
      className={className ? `NumberFieldInput ${className}` : "NumberFieldInput"}
      {...props}
    />
  );
}

function Decrement({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Decrement>) {
  return (
    <BaseNumberField.Decrement
      className={
        className ? `NumberFieldDecrement ${className}` : "NumberFieldDecrement"
      }
      {...props}
    >
      <MinusIcon />
    </BaseNumberField.Decrement>
  );
}

function Increment({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Increment>) {
  return (
    <BaseNumberField.Increment
      className={
        className ? `NumberFieldIncrement ${className}` : "NumberFieldIncrement"
      }
      {...props}
    >
      <PlusIcon />
    </BaseNumberField.Increment>
  );
}

function MinusIcon({ style, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      style={{ display: "block", ...style }}
      {...props}
    >
      <path d="M1.5 8h13" />
    </svg>
  );
}

function PlusIcon({ style, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      style={{ display: "block", ...style }}
      {...props}
    >
      <path d="M1.5 8h13M8 14.5v-13" />
    </svg>
  );
}

export const NumberField = {
  Decrement,
  Group,
  Increment,
  Input,
  Label,
  Root,
  ScrubArea,
  ScrubAreaCursor,
};
