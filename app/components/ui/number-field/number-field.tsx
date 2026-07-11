import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { useId } from "react";

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

interface NumberFieldProps {
  name?: string;
  value: number;
  min?: number;
  step?: number;
  onValueChange: (value: number) => void;
}

export function NumberField({
  name,
  value,
  min = 0,
  step = 1,
  onValueChange,
}: NumberFieldProps) {
  const id = useId();

  return (
    <BaseNumberField.Root
      id={id}
      name={name}
      value={value}
      min={min}
      step={step}
      onValueChange={(next) => {
        onValueChange(next ?? 0);
      }}
    >
      <BaseNumberField.Group className="NumberFieldGroup">
        <BaseNumberField.Decrement className="NumberFieldDecrement">
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="NumberFieldInput" />
        <BaseNumberField.Increment className="NumberFieldIncrement">
          <PlusIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
