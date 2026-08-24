import {NumberField as BaseNumberField} from '@base-ui/react/number-field'

import {cn} from '@/lib/cn'

function Root({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Root>) {
  return (
    <BaseNumberField.Root className={cn('NumberField', className)} {...props}>
      {children}
    </BaseNumberField.Root>
  )
}

function ScrubArea({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubArea>) {
  return (
    <BaseNumberField.ScrubArea
      className={cn('NumberFieldScrubArea', className)}
      {...props}
    >
      {children}
    </BaseNumberField.ScrubArea>
  )
}

function ScrubAreaCursor({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubAreaCursor>) {
  return (
    <BaseNumberField.ScrubAreaCursor
      className={cn('NumberFieldScrubAreaCursor', className)}
      {...props}
    />
  )
}

function Group({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Group>) {
  return (
    <BaseNumberField.Group
      className={cn('NumberFieldGroup', className)}
      {...props}
    >
      {children}
    </BaseNumberField.Group>
  )
}

function Input({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Input>) {
  return (
    <BaseNumberField.Input
      className={cn('NumberFieldInput', className)}
      {...props}
    />
  )
}

// Opt out of browser form-state restore of disabled (Firefox soft-reload hydration mismatch).
const STEPPER_BUTTON_PROPS = {autoComplete: 'off' as const}

function Decrement({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Decrement>) {
  return (
    <BaseNumberField.Decrement
      className={cn('NumberFieldDecrement', className)}
      {...STEPPER_BUTTON_PROPS}
      {...props}
    >
      <MinusIcon />
    </BaseNumberField.Decrement>
  )
}

function Increment({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Increment>) {
  return (
    <BaseNumberField.Increment
      className={cn('NumberFieldIncrement', className)}
      {...STEPPER_BUTTON_PROPS}
      {...props}
    >
      <PlusIcon />
    </BaseNumberField.Increment>
  )
}

function MinusIcon({style, ...props}: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      style={{display: 'block', ...style}}
      {...props}
    >
      <path d="M1.5 8h13" />
    </svg>
  )
}

function PlusIcon({style, ...props}: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      style={{display: 'block', ...style}}
      {...props}
    >
      <path d="M1.5 8h13M8 14.5v-13" />
    </svg>
  )
}

export const NumberField = {
  Decrement,
  Group,
  Increment,
  Input,
  Root,
  ScrubArea,
  ScrubAreaCursor,
}
